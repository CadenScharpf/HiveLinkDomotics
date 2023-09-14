import { user } from "@prisma/client";
// **** User Types **** //
export enum UserRoles {
    Standard,
    Admin,
  }

  export interface ISessionUser extends Partial<user> {
    id: user['id'];
    email: user['email'];
    first_name: user['first_name'];
    last_name: user['last_name'];
    role: user['role'];
  }

  export interface INewUser extends Partial<user> {
    email:  user['email'];
    first_name: user['first_name'];
    last_name: user['last_name'];
    password: string;
  }
