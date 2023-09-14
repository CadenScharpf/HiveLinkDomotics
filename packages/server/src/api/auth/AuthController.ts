import HttpStatusCodes from "@src/constants/HttpStatusCodes";
import SessionUtil from "@src/util/SessionUtil";

import { IReq, IRes } from "../common/types/express/misc";
import {
  ISessionUser,
  ILoginReq,
  IRegisterReq,
  ILoginRes,
  IRegisterRes,
  PrismaClient,
  UserRoles,
} from "hive-link-common";
import { INewUser } from "hive-link-common";
import { RouteError } from "@src/other/classes";
import { USER_ERRORS } from "../user/UserController";
import PwdUtil from "@src/util/PwdUtil";

// **** Functions **** //

/**
 * Get the current user.
 * @param req The request object.
 * @param res The response object.
 * @returns The current user.
 * @throws {RouteError} If the user is not found.
 * @throws {RouteError} If the session data retrieval fails.
 * @throws {RouteError} If the user data is not found.
 * @throws {RouteError} If the user data is invalid.
 * @throws {RouteError} If the user data is not a User or SessionUser.
 **/
async function me(req: IReq, res: IRes) {
  const sessionUser: ISessionUser | undefined | string =
    await SessionUtil.getSessionData<ISessionUser>(req);
  if (typeof sessionUser !== "string" && sessionUser) {
    return res.json({ user: sessionUser as ISessionUser });
  } else {
    res.clearCookie("hive-link-token");
    const errorMessage =
      typeof sessionUser === "string"
        ? "Session data retrieval failed"
        : "User data not found";
    return res.status(400).json({ error: errorMessage });
  }
}

/**
 * Login the user.
 * @param req
 * @param res
 * @returns
 * @throws {RouteError} If the user is not found.
 * @throws {RouteError} If the user data is invalid.
 * @throws {RouteError} If the user data is not a User or SessionUser.
 */
async function login(req: IReq<ILoginReq>, res: IRes<ILoginRes>) {
  const { email, password } = req.body;

  try {
    const prisma = new PrismaClient();
    const user = await prisma.user.findUnique({ where: { email: email } });
    if (!user) {
      throw new RouteError(
        HttpStatusCodes.NOT_FOUND,
        USER_ERRORS.EmailNotFound(email)
      );
    }

    const hash = user.auth_hash || "";
    const pwdPassed = await PwdUtil.compare(password, hash);

    if (!pwdPassed) {
      res
        .status(HttpStatusCodes.UNAUTHORIZED)
        .json({ error: USER_ERRORS.Unauth });
      return;
    }

    const sessionUser: ISessionUser = {
      id: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      role: user.role,
    };
    await SessionUtil.addSessionData(res, sessionUser);
    res.json({ user: sessionUser });
  } catch (err) {
    console.error(err);
    res
      .status(err.status || HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message });
  }
}
/**
 * Regester a new user.
 * @param req
 * @param res
 * @returns
 * @throws {RouteError} If the user is not found.
 * @throws {RouteError} If the user data is invalid.
 * @throws {RouteError} If the user data is not an INewUser.
 */
async function register(req: IReq<IRegisterReq>, res: IRes<IRegisterRes>) {
  const newUser: INewUser = req.body.user;
  try {
    const prisma = new PrismaClient();
    const existingUser = await prisma.user.findUnique({ where: { email: newUser.email } });

    if (existingUser) {
      throw new RouteError(
        HttpStatusCodes.CONFLICT,
        `User with email "${req.body.user.email}" already exists`
      );
    }
    const createdAt = new Date()
    const user = await prisma.user.create({
      data: {
        email: newUser.email,
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        auth_hash: await PwdUtil.getHash(newUser.password),
        role: UserRoles.Standard,
        created_at: createdAt,
        updated_at: createdAt,
      },
    });

    if (user) {
      const sessionUser:ISessionUser = {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        role: user.role,
      };
      await SessionUtil.addSessionData(res, sessionUser);
      res.status(HttpStatusCodes.OK).json({ user: sessionUser });
    } else {
      // If registration fails, send an error response
      res
        .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: "Registration failed" });
    }
  } catch (err) {
    // Handle exceptions and send an appropriate error response
    console.error(err);
    res
      .status(err.status || HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message });
  }
}

/**
 * Logout the user.
 * @param req
 * @param res
 * @returns
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
