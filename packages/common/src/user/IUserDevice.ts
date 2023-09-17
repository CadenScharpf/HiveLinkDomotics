import { device, user_device } from "@prisma/client";
import * as yup from "yup";

export interface INewUserDevice {
    device_id: device["id"];
    home_id: user_device["home_id"];
    product_id: user_device["product_id"];
    name: user_device["name"];
}

export interface IUpdateUserDevice {
    home_id?: user_device["home_id"];
    product_id?: user_device["product_id"];
    name?: user_device["name"];
}

export const UserDeviceSchema: yup.ObjectSchema<INewUserDevice> = yup.object({
    device_id: yup
    .number()
    .min(1, "Invalid Device")
    .defined("Device is required"),
    home_id: yup
    .number()
    .min(1, "Invalid Home")
    .defined("Home is required"),
    product_id: yup
    .number()
    .min(1, "Invalid Product")
    .defined("Product is required"),
    name: yup
    .string()
    .min(2, "Too short")
    .max(50, "Too Long")
    .defined("Name is required"),
});

export const UpdateUserDeviceSchema: yup.ObjectSchema<IUpdateUserDevice> = yup.object({
    home_id: yup
    .number()
    .min(1, "Invalid Home")
    .optional(),
    product_id: yup
    .number()
    .min(1, "Invalid Product")
    .nullable()
    .optional(),
    name: yup
    .string()
    .min(2, "Too short")
    .max(50, "Too Long")
    .optional(),
});