import { user } from "@prisma/client";
import { INewUser, ISessionUser } from "../user/IUser";

// **** Request / Response Types **** //

export interface ILoginReq extends Partial<user> {
  email: user['email'];
  password: string;
}

export interface ILoginRes {
    user: ISessionUser;
}

export interface IRegisterReq {
  user: INewUser;
}

export interface IRegisterRes {
    user: ISessionUser;
}