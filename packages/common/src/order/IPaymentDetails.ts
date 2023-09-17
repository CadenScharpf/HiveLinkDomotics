import { payment_details } from "@prisma/client";
import * as yup from "yup";
export interface INewPaymentDetails {
    user_payment_id: payment_details["user_payment_id"];
    amount: payment_details["amount"];
    status: payment_details["status"];
}

export interface IUpdatePaymentDetails {
    user_payment_id?: payment_details["user_payment_id"];
    amount?: payment_details["amount"];
    status?: payment_details["status"];
}

export const PaymentDetailsSchema = yup.object({
    user_payment_id: yup
        .number()
        .min(0, "Invalid User Payment ID")
        .defined("User Payment ID is required"),
    amount: yup
        .number()
        .min(0, "Invalid Amount")
        .defined("Amount is required"),
    status: yup
        .string()
        .oneOf(["success", "failure"])
        .defined("Status is required"),
});

export const UpdatePaymentDetailsSchema = yup.object({
    user_payment_id: yup
        .number()
        .min(0, "Invalid User Payment ID")
        .optional(),
    amount: yup.number().min(0, "Invalid Amount").optional(),
    status: yup
        .string()
        .oneOf(["success", "failure"])
        .optional(),
});
