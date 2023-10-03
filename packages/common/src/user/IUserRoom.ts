import { user_room } from "@prisma/client";
import { IUserDeviceDetails } from "./IUserDevice";
import * as yup from "yup";


export interface IRoomDetails extends user_room {
    user_device?: IUserDeviceDetails[];
}

export interface INewRoom {
    name: user_room["name"];
}

export interface IUpdateRoom {
    name?: user_room["name"];

}

export const RoomSchema: yup.ObjectSchema<INewRoom> = yup.object({
    name: yup
    .string()
    .min(2, "Too short")
    .max(50, "Too Long")
    .defined("Name is required"),
});

export const UpdateRoomSchema: yup.ObjectSchema<IUpdateRoom> = yup.object({
    name: yup
    .string()
    .min(2, "Too short")
    .max(50, "Too Long")
    .optional(),
});