import { IUser } from "./DbInterface";
// **** User Types **** //
export enum UserRoles {
    Standard,
    Admin,
  }

  export interface ISessionUser {
    id: number;
    email: IUser['email'];
    firstName: IUser['firstName'];
    lastName: IUser['lastName'];
    role: IUser['role'];
  }

  export interface INewUser {
    email:  IUser['email'];
    firstName: IUser['firstName'];
    lastName: IUser['lastName'];
    password: string;
  }
