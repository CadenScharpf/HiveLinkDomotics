import SessionUtil from "@src/util/SessionUtil";

import { ISessionUser, PrismaClient, UserRoles } from "hive-link-common";
import { Request, Response } from "express";
import HttpStatusCodes from "@src/constants/HttpStatusCodes";

const prisma = new PrismaClient();

export const RoomController = {

    getRoom: async (req: Request, res: Response) => {
        try {
            const sUser = await SessionUtil.getSessionData(req)
                .then((usr) => usr)
                .catch((err) => {
                    throw err;
                }) as ISessionUser;
            const room = await prisma.user_room.findUnique({
                where: { id: parseInt(req.params.userRoomId) },
                include: { user_home: true, user_device: true},
            });
            if (!room) {
                return res
                    .status(HttpStatusCodes.NOT_FOUND)
                    .json({ error: "Room not found" });
            }
            if (room.user_home.user_id !== sUser.id && sUser.role !== UserRoles.Admin) {
                return res
                    .status(HttpStatusCodes.UNAUTHORIZED)
                    .json({ error: "User not authorized to perform this action" });
            }
            return res.status(HttpStatusCodes.OK).json({ room });
        } catch (err) {
            throw err;
        }
    }
};