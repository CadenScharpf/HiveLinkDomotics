import { IReq } from "@src/api/common/types/types";
import HttpStatusCodes from "@src/constants/HttpStatusCodes";
import SessionUtil from "@src/util/SessionUtil";
import { Request, Response } from "express"; // Import Request and Response from Express
import {
  INewHome,
  ISessionUser,
  PrismaClient,
  user_home,
} from "hive-link-common";

// ...
const prisma = new PrismaClient();

/*
 *  GET /homes
 *  Get all homes for the current user
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<IHomeDetails[]>}
 */
async function getAll(_: Request, res: Response) {
  const sUser = await SessionUtil.getSessionData<ISessionUser>(_)
    .then((usr) => usr as ISessionUser)
    .catch((err) => {
      throw err;
    });
  const user = await prisma.user.findUnique({
    where: { id: sUser.id },
    include: {
      user_home: {
        include: {
          user_address: true,
          user_room: {
            include: {
              user_device: { include: { device: true, product: true } },
            },
          },
        },
      },
    },
  });

  return res.status(HttpStatusCodes.OK).json({ homes: user?.user_home });
}

async function newHome(
  req: IReq<INewHome>,
  res: Response<{ home: user_home }>
) {
  const sUser = await SessionUtil.getSessionData<ISessionUser>(req)
    .then((usr) => usr as ISessionUser)
    .catch((err) => {
      throw err;
    });
  const created = new Date();
  //  const user_address: number | null = req.body.user_address? (typeof req.body.address_id === "string" ? parseInt(req.body.address_id) : req.body.address_id);
  await prisma.user_home
    .create({
      data: {
        user_id: sUser.id,
        address_id: req.body.address_id ?? null,
        name: req.body.name,
        created_at: created,
        updated_at: created,
      },
    })
    .then((home) => {
      return res.status(HttpStatusCodes.CREATED).json({ home });
    })
    .catch((err) => {
      throw err;
    });
}

export default { getAll, newHome } as const;
