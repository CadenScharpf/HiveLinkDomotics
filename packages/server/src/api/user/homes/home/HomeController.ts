import { IReq, IRes } from "@src/api/common/types/types";
import HttpStatusCodes from "@src/constants/HttpStatusCodes";
import SessionUtil from "@src/util/SessionUtil";
import { Response, Request } from "express";
import {
  ISessionUser,
  IUpdateHome,
  PrismaClient,
  UserRoles,
} from "hive-link-common";

const prisma = new PrismaClient();

/*
  *  GET /homes
  *  Get all homes for the current user
  * @param {Request} req
  * @param {Response} res
  * @returns {Promise<IHomeDetails>} 
*/
async function getOne(_: IReq, res: Response) {
  try {
    const sUser = (await SessionUtil.getSessionData<ISessionUser>(
      _
    )) as ISessionUser;
    if (!sUser) {
      return res
        .status(HttpStatusCodes.UNAUTHORIZED)
        .json({ error: "User not authorized to perform this action" });
    }
    const home_id =
      typeof _.params.userHomeId === "string"
        ? parseInt(_.params.userHomeId)
        : _.params.userHomeId;
    console.log("home_id", home_id);
    console.log("params", _.params);
    const home = await prisma.user_home
      .findUnique({
        where: { id: home_id },
        include: {
          user_address: true,
          user_room: {
            include: {
              user_device: { include: { device: true, product: true } },
            },
          },
        },
      })
      .catch((err) => {
        throw err;
      });
    if (!home) {
      return res
        .status(HttpStatusCodes.NOT_FOUND)
        .json({ error: "Home not found" });
    }
    if (home.user_id !== sUser.id && sUser.role !== UserRoles.Admin) {
      return res
        .status(HttpStatusCodes.UNAUTHORIZED)
        .json({ error: "User not authorized to perform this action" });
    }
    return res.status(HttpStatusCodes.OK).json({ home });
  } catch (err) {
    throw err;
  }
}

async function updateOne(req: IReq<IUpdateHome>, res: IRes) {
  try {
    const sUser = (await SessionUtil.getSessionData<ISessionUser>(
      req
    )) as ISessionUser;
    if (!sUser) {
      return res
        .status(HttpStatusCodes.UNAUTHORIZED)
        .json({ error: "User not authorized to perform this action" });
  }
    const home_id =
      typeof req.params.userHomeId === "string"
        ? parseInt(req.params.userHomeId)
        : req.params.userHomeId;

    const home = await prisma.user_home
      .findUnique({
        where: { id: home_id },
        include: { user_address: true },
      })
      .catch((err) => {
        throw err;
      });
    if (!home) {
      return res
        .status(HttpStatusCodes.NOT_FOUND)
        .json({ error: "Home not found" });
    }
    if (home.user_id !== sUser.id && sUser.role !== UserRoles.Admin) {
      return res
        .status(HttpStatusCodes.UNAUTHORIZED)
        .json({ error: "User not authorized to perform this action" });
    }
    const updated = await prisma.user_home.update({
      where: { id: home_id },
      data: {
        name: req.body.name,
        address_id: req.body.address_id ?? undefined,
        updated_at: new Date(),
      },
    });
    return res.status(HttpStatusCodes.OK).json({ home: updated });
  } catch (err) {
    throw err;
  }
}

export default { getOne } as const;
