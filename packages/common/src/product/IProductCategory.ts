import { product_category } from "@prisma/client";
import * as yup from "yup";

export interface INewProductCategory {
    name: product_category["name"];
    description: product_category["description"];
}

export interface IUpdateProductCategory {
    name?: product_category["name"];
    description?: product_category["description"];
}

export const ProductCategorySchema = yup.object({
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

export const UpdateProductCategorySchema = yup.object({
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
