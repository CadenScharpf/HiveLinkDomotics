import { Router } from "express";
import Paths from "@src/api/common/config/Paths";
import { AddressSchema } from "hive-link-common";
import { yupValidate } from "@src/api/common/middleware/yupValidate";
import { AddressesController } from "./AddressesController";
import { AddressRouter } from "./address/AddressRouter";

export const AddressesRouter = Router({ mergeParams: true });

// Forward routes
AddressesRouter.use(Paths.User.Addresses.Address.Base, AddressRouter);

// Operations
AddressesRouter.get("/", AddressesController.getAll);

AddressesRouter.post(
  "/",
  yupValidate(AddressSchema),
  AddressesController.newAddress
);
