class AccessControl {
    constructor(grantList) {
        this.grantList = grantList
        this.resource = null
        this.hasCalledPermissionMethod = false;
    }

    setResource(resource) {
        if (!this.grantList.hasOwnProperty(resource)) {
            throw new Error("You dont have the rights to access this resource")
        }

        this.resource = resource

        this.hasCalledPermissionMethod = false;

        return this
    }

    canRead() {
        this.#checkResourceExists()
        this.#checkPermissionMethodCall();

        this.hasCalledPermissionMethod = true;

        return this.grantList[this.resource]?.canRead
    }
    canCreate() {
        this.#checkResourceExists()
        this.#checkPermissionMethodCall();

        this.hasCalledPermissionMethod = true;

        return this.grantList[this.resource]?.canCreate
    }

    canUpdate() {
        this.#checkResourceExists()
        this.#checkPermissionMethodCall();

        this.hasCalledPermissionMethod = true;

        return this.grantList[this.resource]?.canUpdate
    }

    canDelete() {
        this.#checkResourceExists()
        this.#checkPermissionMethodCall();

        this.hasCalledPermissionMethod = true;

        return this.grantList[this.resource]?.canDelete
    }
    canReadById() {
        this.#checkResourceExists()
        this.#checkPermissionMethodCall();

        this.hasCalledPermissionMethod = true;

        return this.grantList[this.resource]?.canIdRead
    }

    #checkResourceExists() {
        if (!this.resource) {
            throw new Error("Set resource before attempting to perform this action")
        }
    }

    #checkPermissionMethodCall() {
        if (this.hasCalledPermissionMethod) {
            throw new Error('You can only call one permission method after setResource');
        }
    }
}

module.exports = { AccessControl }