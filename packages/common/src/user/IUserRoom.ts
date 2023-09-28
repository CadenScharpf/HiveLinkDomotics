import { user_room } from "@prisma/client";
import { IUserDeviceDetails } from "./IUserDevice";

export interface IRoomDetails extends user_room {
    user_device?: IUserDeviceDetails[];
}

