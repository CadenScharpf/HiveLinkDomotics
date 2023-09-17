import {shopping_session} from "@prisma/client";
import * as yup from "yup";

export interface INewShoppingSession {
    user_id: shopping_session["user_id"];
    total: shopping_session["total"];
}

export interface IUpdateShoppingSession {
    user_id?: shopping_session["user_id"];
    total?: shopping_session["total"];
}

export const ShoppingSessionSchema = yup.object({
    user_id: yup
        .number()
        .min(0, "Invalid User ID")
        .defined("User ID is required"),
    total: yup.number().min(0, "Invalid Total").defined("Total is required"),
});

export const UpdateShoppingSessionSchema = yup.object({
    user_id: yup.number().min(0, "Invalid User ID").optional(),
    total: yup.number().min(0, "Invalid Total").optional(),
});

