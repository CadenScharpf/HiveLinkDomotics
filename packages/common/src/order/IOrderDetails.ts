import { order_details } from "@prisma/client";
import * as yup from "yup";

export interface INewOrderDetails {
    user_id: order_details["user_id"];
    payment_id: order_details["payment_id"];
    address_id: order_details["address_id"];
    total: order_details["total"];
}

export interface IUpdateOrderDetails {
    user_id?: order_details["user_id"];
    payment_id?: order_details["payment_id"];
    address_id?: order_details["address_id"];
    total?: order_details["total"];
}

export const OrderDetailsSchema = yup.object({
    user_id: yup
        .number()
        .min(0, "Invalid User ID")
        .defined("User ID is required"),
    payment_id: yup
        .number()
        .min(0, "Invalid Payment ID")
        .defined("Payment ID is required"),
    address_id: yup
        .number()
        .min(0, "Invalid Address ID")
        .defined("Address ID is required"),
    total: yup.number().min(0, "Invalid Total").defined("Total is required"),
});

export const UpdateOrderDetailsSchema = yup.object({
    user_id: yup.number().min(0, "Invalid User ID").optional(),
    payment_id: yup.number().min(0, "Invalid Payment ID").optional(),
    address_id: yup.number().min(0, "Invalid Address ID").optional(),
    total: yup.number().min(0, "Invalid Total").optional(),
});