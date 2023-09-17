import SessionUtil from "@src/util/SessionUtil";
import { INewAddress, ISessionUser, PrismaClient, user_address } from "hive-link-common";
import { Request, Response } from "express"; // Import Request and Response from Express
import HttpStatusCodes from "@src/constants/HttpStatusCodes";
import { IReq } from "@src/api/common/types/types";

const prisma = new PrismaClient();

export const AddressesController = {
  getAll: async (_: Request, res: Response) => {
    const sUser = await SessionUtil.getSessionData<ISessionUser>(_)
      .then((usr) => usr as ISessionUser)
      .catch((err) => {
        throw err;
      });
    const user = await prisma.user.findUnique({
      where: { id: sUser.id },
      include: { user_address: true },
    });
    return res
      .status(HttpStatusCodes.OK)
      .json({ addresses: user?.user_address });
  },

  newAddress: async (
    req: IReq<INewAddress>,
    res: Response<{ address: user_address }>
  ) => {
    const sUser = await SessionUtil.getSessionData<ISessionUser>(req)
      .then((usr) => usr as ISessionUser)
      .catch((err) => {
        throw err;
      });
    const created = new Date();
    await prisma.user_address
      .create({
        data: {
          user_id: sUser.id,
          address_line1: req.body.address_line1,
          address_line2: req.body.address_line2 ?? "",
          city: req.body.city,
          postal_code: req.body.postal_code,
          country: req.body.country,
          telephone: req.body.telephone,
          mobile: req.body.mobile ?? null,
          created_at: created,
          updated_at: created,
        },
      })
      .then((address) => {
        return res.status(HttpStatusCodes.CREATED).json({ address });
      })
      .catch((err) => {
        throw err;
      });
  }
};


