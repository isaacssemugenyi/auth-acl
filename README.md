A simple attribute based access control library for nodejs.

This can be used in expressjs and any other javascript based framework

### Usage

```javascript
const { AccessControl } = require('auth-acl')

const ACCESS_LIST = {
    RATINGS: {
        canRead: true,
        canCreate: true,
        canUpdate: false,
        canDelete: false,
        canReadById: false,
    },
    ARTICLES: {
        canRead: true,
        canCreate: true,
        canUpdate: true,
        canDelete: true,
        canReadById: false,
    },
} 

const ac1 = new AccessControl(ACCESS_LIST)

console.log(ac1.setResource('RATING').canRead()) // true
console.log(ac1.setResource('RATING').canCreate()) // false

```

### Usage in Express

The authorization middleware mostly preferable should be placed after the authentication middleware so as to first authenticate the client then authorize access to a resource

```js
const { AccessControl } = require('auth-acl')

const ACCESS_LIST = {
    RATINGS: {
        canRead: true,
        canCreate: true,
        canUpdate: false,
        canDelete: false,
        canReadById: false,
    },
    ARTICLES: {
        canRead: true,
        canCreate: true,
        canUpdate: true,
        canDelete: true,
        canReadById: false,
    },
} 

const authorizeAccess = (resource, accessCallback) => {
    return async (req, res, next) => {
        try {
            const ac = new AccessControl(ACCESS_LIST);

            if (!ac.setResource(resource)[accessCallback]()) {
                const error = new Error(`You dont have the rights to access this resource`);

                error.status = 401;
                return next(error);
            }

            next();
        } catch (err) {
            const error = new Error(err.message);
            error.status = 401;
            return next(error);
        }
    }
}

// In the route

const settingsService = require('../controller/settings')
const { checkAuthentication, authorizeAccess } = require('./auth');

module.exports = (app) => {
    app
        .route('/todos')
        .post(
            checkAuthentication, // to authenticate
            authorizeAccess('RATINGS', 'canCreate'),
            settingsService.save);
}

```

We can still extend the AccessControl class functionality like in the below example

```js
class ExtendedAccessControl extends AccessControl {
    canDisable() {
        this.hasCalledPermissionMethod = true;

        return this.grantList[this.resource]?.canDisable
    }
}

const ac1 = new ExtendedAccessControl(ACCESS_LIST)

console.log(ac1.setResource('RATINGS').canDisable())
```

