import { device } from "@prisma/client";
import * as yup from "yup";
export interface INewDevice {
    category_id: device["category_id"];
    manufacturer: device["manufacturer"];
    model: device["model"];
    name: device["name"];
    description: device["description"];
}

export interface IUpdateDevice {
    category_id?: device["category_id"];
    manufacturer?: device["manufacturer"];
    model?: device["model"];
    name?: device["name"];
    description?: device["description"];
}

export const DeviceSchema = yup.object({
    category_id: yup
        .number()
        .min(1, "Invalid Category")
        .defined("Category is required"),
    manufacturer: yup
        .string()
        .min(2, "Too short")
        .max(20, "Too Long")
        .defined("Manufacturer is required"),
    model: yup
        .string()
        .min(2, "Too short")
        .max(20, "Too Long")
        .defined("Model is required"),
    name: yup
        .string()
        .min(2, "Too short")
        .max(50, "Too Long")
        .defined("Name is required"),
    description: yup
        .string()
        .min(2, "Too short")
        .max(255, "Too Long")
        .defined("Description is required"),
});

export const UpdateDeviceSchema = yup.object({
    category_id: yup
        .number()
        .min(1, "Invalid Category")
        .optional(),
    manufacturer: yup
        .string()
        .min(2, "Too short")
        .max(20, "Too Long")
        .optional(),
    model: yup
        .string()
        .min(2, "Too short")
        .max(20, "Too Long")
        .optional(),
    name: yup
        .string()
        .min(2, "Too short")
        .max(50, "Too Long")
        .optional(),
    description: yup
        .string()
        .min(2, "Too short")
        .max(255, "Too Long")
        .optional(),
});
