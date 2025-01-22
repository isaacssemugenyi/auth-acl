type ICanMethod = boolean;
type ISetResource = string;

export interface AccessControlInput {
  [resource: ISetResource]: {
    canRead: ICanMethod;
    canCreate?: ICanMethod;
    canUpdate?: ICanMethod;
    canDelete?: ICanMethod;
    canReadById?: ICanMethod;
  };
}

export declare class AccessControl {
  constructor(accessControl: AccessControlInput);

  /**
 * @method setResource
 * @argument { string}
 * @description setResource('USERS')
 * @returns {InstanceType}
 */
  setResource(resource: ISetResource): this;

  /**
 * @method canRead
 * @returns {boolean}
 * @example false
 */
  canRead(): ICanMethod;

  /**
 * @method canCreate
 * @returns {boolean}
 * @example false
 */
  canCreate(): ICanMethod;

  /**
 * @method canUpdate
 * @returns {boolean}
 * @example false
 */
  canUpdate(): ICanMethod;

  /**
 * @method canDelete
 * @returns {boolean}
 * @example false
 */
  canDelete(): ICanMethod;

  /**
 * @method canReadById
 * @returns {boolean}
 * @example true
 */
  canReadById(): ICanMethod;
}

