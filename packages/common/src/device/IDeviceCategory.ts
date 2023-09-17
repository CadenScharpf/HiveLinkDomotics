import { device_category } from "@prisma/client";
import * as yup from "yup";

export interface INewDeviceCategory {
    name: device_category["name"];
    description: device_category["description"];
}

export interface IUpdateDeviceCategory {
    name?: device_category["name"];
    description?: device_category["description"];
}

export const DeviceCategorySchema = yup.object({
    name: yup
        .string()
        .min(2, "Too short")
        .max(20, "Too Long")
        .defined("Name is required"),
    description: yup
        .string()
        .min(2, "Too short")
        .max(255, "Too Long")
        .defined("Description is required"),
});

export const UpdateDeviceCategorySchema = yup.object({
    name: yup
        .string()
        .min(2, "Too short")
        .max(20, "Too Long")
        .optional(),
    description: yup
        .string()
        .min(2, "Too short")
        .max(255, "Too Long")
        .optional(),
});
