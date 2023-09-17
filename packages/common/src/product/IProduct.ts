import { product } from "@prisma/client"
import * as yup from "yup";

interface IProduct {
    category_id: product["category_id"];
    discount_id: product["discount_id"];
    inventory_id: product["inventory_id"];
    name: product["name"];
    description: product["description"];
    sku: product["sku"];
    price: product["price"];
    active: product["active"];
}

interface IUpdateProduct {
    category_id?: product["category_id"];
    discount_id?: product["discount_id"];
    inventory_id?: product["inventory_id"];
    name?: product["name"];
    description?: product["description"];
    sku?: product["sku"];
    price?: product["price"];
    active?: product["active"];
}

export const ProductSchema = yup.object({
    category_id: yup
        .number()
        .min(1, "Invalid Category")
        .defined("Category is required"),
    discount_id: yup
        .number()
        .min(1, "Invalid Discount")
        .defined("Discount is required"),
    inventory_id: yup
        .number()
        .min(1, "Invalid Inventory")
        .defined("Inventory is required"),
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
    sku: yup
        .string()
        .min(2, "Too short")
        .max(50, "Too Long")
        .defined("SKU is required"),
    price: yup
        .number()
        .min(0, "Invalid Price")
        .defined("Price is required"),
    active: yup
        .boolean()
        .defined("Active is required"),
});

export const UpdateProductSchema = yup.object({
    category_id: yup
        .number()
        .min(1, "Invalid Category")
        .optional(),
    discount_id: yup
        .number()
        .min(1, "Invalid Discount")
        .optional(),
    inventory_id: yup
        .number()
        .min(1, "Invalid Inventory")
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
    sku: yup
        .string()
        .min(2, "Too short")
        .max(50, "Too Long")
        .optional(),
    price: yup
        .number()
        .min(0, "Invalid Price")
        .optional(),
    active: yup
        .boolean()
        .optional(),
});
