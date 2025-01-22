const { AccessControl } = require('./index');

const ACCESS_RIGHT = {
    RATINGS: { canRead: false, canCreate: true, canUpdate: false, canDelete: false, canReadById: false, },
    ARTICLES: { canRead: false, canCreate: false, canUpdate: false, canDelete: true, canReadById: true, },
    USERS: { canRead: false, canCreate: false, canUpdate: false, canDelete: false, canReadById: false, },
    COMMENTS: { canRead: false, canCreate: true, canUpdate: true, canDelete: true, canReadById: false, },
    SETTINGS: { canRead: true, canCreate: false, canUpdate: false, canDelete: false, canReadById: false, },
    NOTIFICATIONS: { canRead: false, canCreate: false, canUpdate: true, canDelete: false, canReadById: true, },
    MESSAGES: { canRead: false, canCreate: false, canUpdate: false, canDelete: true, canReadById: false, },
    REVIEWS: { canRead: true, canCreate: false, canUpdate: true, canDelete: false, canReadById: false, },
    ORDERS: { canRead: true, canCreate: false, canUpdate: true, canDelete: false, canReadById: true, },
    PRODUCTS: { canRead: false, canCreate: true, canUpdate: true, canDelete: false, canReadById: false, },
};

let ac = {}


beforeEach(() => {
    ac = new AccessControl(ACCESS_RIGHT)
})

test('Error to set Resource First', () => {
    expect(() => ac.canCreate()).toThrow('Set resource before attempting to perform this action');
});

test('Error Modules does not exist', () => {
    expect(() => ac.setResource("DEVELOPERS")).toThrow('You dont have the rights to access this resource');
});

test('canCreate on RATINGS to equal true', () => {
    const result = ac.setResource("RATINGS").canCreate()
    expect(result).toBeTruthy();
});

test('canRead on RATINGS to equal false', () => {
    const result = ac.setResource("RATINGS").canRead()
    expect(result).toBeFalsy();
});

