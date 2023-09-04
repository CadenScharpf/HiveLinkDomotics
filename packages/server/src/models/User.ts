import { UserRoles, IUser, ISessionUser } from 'hive-link-common';


// **** Variables **** //
const INVALID_CONSTRUCTOR_PARAM = 'nameOrObj arg must a string or an ' + 
  'object with the appropriate user keys.';

// **** Functions **** //

/**
 * Create new User.
 */
function new_(
  email?: string,
  telephone?: string,
  firstName?: string,
  lastName?: string,
  role?: UserRoles,
authHash?: string,
  id?: number, // id last cause usually set by db
): IUser {
  return {
    id: (id ?? -1),
    email: (email ?? ''),
    telephone: (telephone ?? ''),
    firstName: (firstName ?? ''),
    lastName: (lastName ?? ''),
    role: (role ?? UserRoles.Standard),
    authHash: (authHash ?? ''),
    createdAt: '',
    modifiedAt: '',
  };
}

/**
 * Get user instance from object.
 */
function from(param: object): IUser {
  // Check is user
  if (!isUser(param)) {
    throw new Error(INVALID_CONSTRUCTOR_PARAM);
  }
  // Get user instance
  const p = param as IUser;
  return new_(p.email, p.telephone, p.firstName, p.lastName,  p.role, p.authHash??'', p.id );
}

/**
 * See if the param meets criteria to be a user.
 */
function isUser(arg: unknown): boolean {
  return (
    !!arg &&
    typeof arg === 'object' &&
    typeof (arg as IUser).id === 'number' &&
    typeof (arg as IUser).email === 'string' &&
    typeof (arg as IUser).telephone === 'string' &&
    typeof (arg as IUser).firstName === 'string' &&
    typeof (arg as IUser).lastName === 'string' &&
    typeof (arg as IUser).role === 'number' &&
    typeof (arg as IUser).authHash === 'string' &&
    typeof (arg as IUser).createdAt === 'string' &&
    typeof (arg as IUser).modifiedAt === 'string'
  );
}

// **** Export default **** //

export default {
  new: new_,
  from,
  isUser,
} as const;
