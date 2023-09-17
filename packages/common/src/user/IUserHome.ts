import { user_home } from "@prisma/client";
import * as yup from "yup";

export interface INewHome{
    name: user_home["name"];
    address_id: user_home["address_id"];
}

export interface IUpdateHome{
    name?: user_home["name"];
    address_id?: user_home["address_id"];
}

export const HomeSchema: yup.ObjectSchema<INewHome> = yup.object({
    name: yup
    .string()
    .min(2, "Too short")
    .max(50, "Too Long")
    .defined("Name is required"),
    address_id: yup.number().nullable().defined("Address is required"),
});

export const UpdateHomeSchema: yup.ObjectSchema<IUpdateHome> = yup.object({
    name: yup
    .string()
    .min(2, "Too short")
    .max(50, "Too Long")
    .optional(),
  address_id: yup.number().nullable().optional(),
});
