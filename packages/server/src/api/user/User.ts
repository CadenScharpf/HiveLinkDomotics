import { INewUser, ISessionUser, IUser, UserRoles } from "hive-link-common";
import { UserEntity } from "./UserEntity";
import { DataSource, Entity, Repository } from "typeorm";
import { AppDataSource } from "@src/data-source";
import PwdUtil from "@src/util/PwdUtil";
import HttpStatusCodes from "@src/constants/HttpStatusCodes";
import { RouteError } from "@src/other/classes";

export const USER_ERRORS = {
  idNotFoundErr: (id: number) => `User with id ${id} not found`,
  Unauth: "Unauthorized",
  EmailNotFound(email: string) {
    return `User with email "${email}" not found`;
  },
  EmailInUse(email: string) {
    return `User with email "${email}" already exists`;
  },
}



export class User extends UserEntity implements IUser {
  private static repo: Repository<UserEntity> =
    AppDataSource.getDataSource().getRepository(UserEntity);

  constructor(user: IUser) {
    super(user);
  } 

  static async create(newUser: INewUser): Promise<UserEntity> {
    const createdAt = new Date().toISOString().slice(0, 19).replace("T", " ");
    const user: IUser = this.repo.create({
      ...newUser,
      authHash: await PwdUtil.getHash(newUser.password),
      role: UserRoles.Standard,
      createdAt: createdAt,
      updatedAt: createdAt,
      telephone: null,
    });
    return await this.repo.save(this.repo.create(user));
  }

  static async getAll(): Promise<UserEntity[]> {
    return await this.repo.find();
  }

  static async add(user: INewUser): Promise<IUser> {
    const createdAt = new Date().toISOString().slice(0, 19).replace("T", " ");
    const newUser = await this.repo.save({
      ...user,
      authHash: await PwdUtil.getHash(user.password),
      role: UserRoles.Standard,
      createdAt: createdAt,
      updatedAt: createdAt,
      telephone: null,
    });
    return newUser;
  }

  static async delete(id: number): Promise<void> {
    const persists = this.repo.findOneBy({id: id});
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      USER_ERRORS.idNotFoundErr(id),
    );
  }
  // Delete user
  await this.repo.delete(id);

}
  // Delete user

  static async update(user: IUser): Promise<UserEntity> {
    const persists = User.findOneBy({ id: user.id });
    if (!persists) {
      throw new RouteError(HttpStatusCodes.NOT_FOUND, USER_ERRORS.idNotFoundErr(user.id));
    }
    // Return user
    return User.repo.save(User.repo.create({ ...user }));
  }

  static async findByEmail(email: string): Promise<UserEntity | null> {
    return await this.repo.findOne({ where: { email } });
  }

  static findOneBy(conditions: any): Promise<UserEntity | null> {
    return this.repo.findOne(conditions);
  }

  static async findOne(conditions: {
    where: { id: number };
  }): Promise<UserEntity | null> {
    return this.repo.findOne(conditions);
  }

  public static toSessionUser(user: User): ISessionUser {
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    };
  }

  static isUser(user: any): user is User {
    return (
      user &&
      typeof user.id === "number" &&
      typeof user.email === "string" &&
      typeof user.firstName === "string" &&
      typeof user.lastName === "string" &&
      typeof user.role === "number" &&
      typeof user.telephone === "string" &&
      typeof user.authHash === "string" &&
      typeof user.createdAt === "string" &&
      typeof user.updatedAt === "string"
    );
  }
}
