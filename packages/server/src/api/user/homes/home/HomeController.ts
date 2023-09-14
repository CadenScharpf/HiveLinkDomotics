import { IReq, IRes } from "@src/api/common/types/types";
import HttpStatusCodes from "@src/constants/HttpStatusCodes";
import { PrismaClient } from "hive-link-common";

const prisma = new PrismaClient();
async function getAll(_: IReq, res: IRes) {
  const users = await prisma.user.findMany();
  return res.status(HttpStatusCodes.OK).json({ users });
}

export default {getAll} as const;