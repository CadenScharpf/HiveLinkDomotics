import { product_discount } from "@prisma/client";
import * as yup from "yup";

export interface INewProductDiscount {
    name: product_discount["name"];
    description: product_discount["description"];
    percent: product_discount["percent"];
    active: product_discount["active"];
}

export interface IUpdateProductDiscount {
    name?: product_discount["name"];
    description?: product_discount["description"];
    percent?: product_discount["percent"];
    active?: product_discount["active"];
}

export const ProductDiscountSchema = yup.object({
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
    percent: yup
        .number()
        .min(0, "Invalid Percent")
        .max(100, "Invalid Percent")
        .defined("Percent is required"),
    active: yup
        .boolean()
        .defined("Active is required"),
});

export const UpdateProductDiscountSchema = yup.object({
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
    percent: yup
        .number()
        .min(0, "Invalid Percent")
        .max(100, "Invalid Percent")
        .optional(),
    active: yup
        .boolean()
        .optional(),
});
