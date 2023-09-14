import HttpStatusCodes from "@src/constants/HttpStatusCodes";
import { INewUser, PrismaClient, UserRoles, user } from "hive-link-common";
import { IReq, IRes } from "../common/types/express/misc";
import PwdUtil from "@src/util/PwdUtil";

const prisma = new PrismaClient();

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

// **** Functions **** //

/**
 * Get all users.
 */
async function getAll(_: IReq, res: IRes) {
  const users = await prisma.user.findMany();
  return res.status(HttpStatusCodes.OK).json({ users });
}

/**
 * Add one user.
 */
async function add(req: IReq<{ user: INewUser }>, res: IRes) {
  const { user } = req.body;
  const timeStamp = new Date();
  await prisma.user.create({
    data: {
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      auth_hash: await PwdUtil.getHash(user.password),
      role: UserRoles.Standard,
      created_at: timeStamp,
      updated_at: timeStamp,
    },
  });
  return res.status(HttpStatusCodes.CREATED).end();
}

/**
 * Update one user.
 */
async function update(req: IReq<{ user: user }>, res: IRes) {
  const { user } = req.body;
  const timeStamp = new Date();
  await prisma.user.update({
    where: { id: user.id },
    data: {
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      role: user.role,
      updated_at: timeStamp,
    },
  });
  return res.status(HttpStatusCodes.OK).end();
}

/**
 * Delete one user.
 */
async function delete_(req: IReq, res: IRes) {
  const id = +req.params.id;
  await prisma.user.delete({ where: { id } });
  return res.status(HttpStatusCodes.OK).end();
}

// **** Export default **** //
export default {
  getAll,
  add,
  update,
  delete: delete_,
} as const;
