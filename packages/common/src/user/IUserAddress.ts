import {user_address} from "@prisma/client";
import * as yup from "yup";

export interface INewAddress{
    address_line1: user_address["address_line1"];
    address_line2?: user_address["address_line2"];
    city: user_address["city"];
    postal_code: user_address["postal_code"];
    country: user_address["country"];
    telephone: user_address["telephone"];
    mobile?: user_address["mobile"];
}

export interface IUpdateAddress{
    address_line1?: user_address["address_line1"];
    address_line2?: user_address["address_line2"];
    city?: user_address["city"];
    postal_code?: user_address["postal_code"];
    country?: user_address["country"];
    telephone?: user_address["telephone"];
    mobile?: user_address["mobile"];
}

export const AddressSchema: yup.ObjectSchema<INewAddress> = yup.object({
    address_line1: yup
    .string()
    .min(5, "Too short")
    .max(255, "Too Long")
    .defined("Address Line 1 is required"),
    address_line2: yup
    .string()
    .min(2, "Too short")
    .max(255, "Too Long")
    .nullable()
    .optional(),
    city: yup
    .string()
    .min(2, "Too short")
    .max(255, "Too Long")
    .defined("City is required"),
    postal_code: yup
    .string()
    .min(2, "Too short")
    .max(255, "Too Long")
    .defined("Postal Code is required"),
    country: yup
    .string()
    .min(2, "Too short")
    .max(255, "Too Long")
    .defined("Country is required"),
    telephone: yup
    .string()
    .min(2, "Too short")
    .max(20, "Too Long")
    .defined("Telephone is required"),
    mobile: yup
    .string()
    .min(2, "Too short")
    .max(20, "Too Long")
    .nullable()
    .optional(),
});


export const UpdateAddressSchema: yup.ObjectSchema<IUpdateAddress> = yup.object({
    address_line1: yup
    .string()
    .min(2, "Too short")
    .max(255, "Too Long")
    .optional(),
    address_line2: yup
    .string()
    .min(2, "Too short")
    .max(255, "Too Long")
    .nullable()
    .optional(),
    city: yup
    .string()
    .min(2, "Too short")
    .max(255, "Too Long")
    .optional(),
    postal_code: yup
    .string()
    .min(2, "Too short")
    .max(255, "Too Long")
    .optional(),
    country: yup
    .string()
    .min(2, "Too short")
    .max(255, "Too Long")
    .optional(),
    telephone: yup
    .string()
    .min(2, "Too short")
    .max(20, "Too Long")
    .optional(),
    mobile: yup
    .string()
    .min(2, "Too short")
    .max(20, "Too Long")
    .nullable()
    .optional(),
});

