import HttpStatusCodes from "@src/constants/HttpStatusCodes";
import SessionUtil from "@src/util/SessionUtil";
import AuthService from "@src/controller/AuthController";

import { IReq, IRes } from "../util/types/express/misc";
import {
  ISessionUser,
  ILoginReq,
  IRegisterReq,
  ILoginRes,
  IRegisterRes,
} from "hive-link-common";
import { INewUser } from "hive-link-common";
import { Router } from "express";
import Paths from "../util/constants/Paths";


// **** Functions **** //

async function me(req: IReq, res: IRes) {
  const user = await AuthService.me(req);
  return res.json({ user: user });
}
/**
 * Login a user.
 **/
async function login(req: IReq<ILoginReq>, res: IRes<ILoginRes>) {
  const { email, password } = req.body;
  // Login
  const user = await AuthService.login(email, password);
  // Setup Admin Cookie
  const sessionUser: ISessionUser = {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
  };
  await SessionUtil.addSessionData(res, sessionUser);
  res.json({ user: sessionUser });
  // Return
  return res.status(HttpStatusCodes.OK).end();
}

/**
 * Regester a new user. 
 */
async function register(req: IReq<IRegisterReq>, res: IRes<IRegisterRes>) {
  try {
    const user = await AuthService.register(req.body.user);

    

    if (user) {
      // If registration is successful, add session data and send a success response
      await SessionUtil.addSessionData(res, user.toSessionUser());
      res.status(HttpStatusCodes.OK).json({ user: user.toSessionUser() });
    } else {
      // If registration fails, send an error response
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Registration failed' });
    }
  } catch (err) {
    // Handle exceptions and send an appropriate error response
    console.error(err);
    res.status(err.status).json({ error: err.message });
  }
}

/**
 * Logout the user.
 */
function logout(_: IReq, res: IRes) {
  SessionUtil.clearCookie(res);
  return res.status(HttpStatusCodes.OK).end();
}

// **** Export default **** //

export default {
  login,
  logout,
  register,
  me,
} as const;
