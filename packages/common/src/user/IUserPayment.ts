import { user_payment } from "@prisma/client";
import * as yup from "yup";

export interface INewUserPayment {
    payment_type: user_payment["payment_type"];
    account_no: user_payment["account_no"];
    provider: user_payment["provider"];
    expiry: user_payment["expiry"];
}

export interface IUpdateUserPayment {
    payment_type?: user_payment["payment_type"];
    account_no?: user_payment["account_no"];
    provider?: user_payment["provider"];
    expiry?: user_payment["expiry"];
}

export const UserPaymentSchema = yup.object({
    payment_type: yup
        .string()
        .oneOf(["credit", "debit", "netbanking", "wallet"])
        .defined("Payment Type is required"),
    account_no: yup
        .string()
        .min(16, "Invalid Account Number")
        .max(16, "Invalid Account Number")
        .defined("Account Number is required"),
    provider: yup
        .string()
        .oneOf(["visa", "mastercard", "rupay", "paypal", "paytm"])
        .defined("Provider is required"),
    expiry: yup
        .date()
        .min(new Date(), "Invalid Expiry Date")
        .defined("Expiry Date is required"),
});

export const UpdateUserPaymentSchema = yup.object({
    payment_type: yup
        .string()
        .oneOf(["credit", "debit", "netbanking", "wallet"])
        .optional(),
    account_no: yup
        .string()
        .min(16, "Invalid Account Number")
        .max(16, "Invalid Account Number")
        .optional(),
    provider: yup
        .string()
        .oneOf(["visa", "mastercard", "rupay", "paypal", "paytm"])
        .optional(),
    expiry: yup.date().min(new Date(), "Invalid Expiry Date").optional(),
});


