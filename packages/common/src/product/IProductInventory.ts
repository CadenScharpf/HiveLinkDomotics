import { product_inventory } from "@prisma/client";
import * as yup from "yup";

export interface INewProductInventory {
  quantity: product_inventory["quantity"];
}

export interface IUpdateProductInventory {
  quantity?: product_inventory["quantity"];
}

export const ProductInventorySchema = yup.object({
  quantity: yup
    .number()
    .min(0, "Invalid Quantity")
    .defined("Quantity is required"),
});

export const UpdateProductInventorySchema = yup.object({
  quantity: yup.number().min(0, "Invalid Quantity").optional(),
});
