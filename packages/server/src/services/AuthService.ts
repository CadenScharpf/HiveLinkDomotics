import UserRepo from '@src/repos/UserRepo';

import PwdUtil from '@src/util/PwdUtil';
import { tick } from '@src/util/misc';

import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { RouteError } from '@src/other/classes';
import { IUser } from 'hive-link-common';
import { User } from '@src/models/User';
import { INewUser, ISessionUser } from 'hive-link-common';
import SessionUtil from '@src/util/SessionUtil';
import { IReq } from '@src/routes/types/types';

export function isSessionUser(user: any): user is ISessionUser {
  return (
      user &&
      typeof user.id === 'number' &&
      typeof user.email === 'string' &&
      typeof user.name === 'string' &&
      typeof user.role === 'number' &&
      typeof user.phone === 'string'
  );
}

// **** Variables **** //

// Errors
export const Errors = {
  Unauth: 'Unauthorized',
  EmailNotFound(email: string) {
    return `User with email "${email}" not found`;
  },
} as const;


// **** Functions **** //

async function me(req: IReq): Promise<ISessionUser> {
  var user: ISessionUser = {
    id: 0,
    email: '',
    firstName: '',
    lastName: '',
    role: 1,
  }
  await SessionUtil.getSessionData<ISessionUser>(req).then((_user: ISessionUser | undefined | string) => {
    const {id, email, firstName, lastName, role} = _user as ISessionUser;
    user = {id, email, firstName, lastName, role} as ISessionUser;
    console.log(user);
    return user as ISessionUser;
  }
  
  )

  return user as ISessionUser;
}
/**
 * Login a user.
 */
async function login(email: string, password: string): Promise<IUser> {
  // Fetch user
  const user = await UserRepo.getOne(email);
  
  if (!user) {
    throw new RouteError(
      HttpStatusCodes.UNAUTHORIZED,
      Errors.EmailNotFound(email),
    );
  }
  // Check password
  const hash = (user.authHash ?? ''),
    pwdPassed = await PwdUtil.compare(password, hash);
  if (!pwdPassed) {
    // If password failed, wait 500ms this will increase security
    await tick(500);
    throw new RouteError(
      HttpStatusCodes.UNAUTHORIZED, 
      Errors.Unauth,
    );
  }
  // Return
  return user;
}


async function register(_newUser: INewUser): Promise<IUser> {
  const {email, firstName, lastName, password } = _newUser;
  const authHash = await PwdUtil.getHash(password);
  const user = await UserRepo.getOne(email);
  if (user) {
    throw new RouteError(
      HttpStatusCodes.CONFLICT,
      `User with email "${email}" already exists`,
    );
  }
  const newUser  = User.from({firstName, lastName, email, authHash})
  await UserRepo.add(newUser);
  return newUser;
}


// **** Export default **** //

export default {
  login,
  register,
  me,
} as const;
