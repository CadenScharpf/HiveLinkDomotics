import { order_items } from "@prisma/client";
import * as yup from "yup";

export interface INewOrderItems {
    order_id: order_items["order_id"];
    product_id: order_items["product_id"];
    quantity: order_items["quantity"];
}

export interface IUpdateOrderItems {
    order_id?: order_items["order_id"];
    product_id?: order_items["product_id"];
    quantity?: order_items["quantity"];
}

export const OrderItemsSchema = yup.object({
    order_id: yup
        .number()
        .min(0, "Invalid Order ID")
        .defined("Order ID is required"),
    product_id: yup
        .number()
        .min(0, "Invalid Product ID")
        .defined("Product ID is required"),
    quantity: yup
        .number()
        .min(0, "Invalid Quantity")
        .defined("Quantity is required"),
});

export const UpdateOrderItemsSchema = yup.object({
    order_id: yup.number().min(0, "Invalid Order ID").optional(),
    product_id: yup.number().min(0, "Invalid Product ID").optional(),
    quantity: yup.number().min(0, "Invalid Quantity").optional(),
});



