import { IUser } from "./DbInterface";
// **** User Types **** //
export enum UserRoles {
    Standard,
    Admin,
  }

  export interface ISessionUser {
    id: number;
    email: string;
    name: string;
    role: IUser['role'];
    phone: string;
  }

  export interface INewUser {
    email: string;
    telephone: string;
    firstName: string;
    lastName: string;
    password: string;
  }
