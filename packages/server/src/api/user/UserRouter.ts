import { Router } from "express";
import adminMw from '../common/middleware/adminMw';
import UserController from './UserController';
import Paths from "../common/config/Paths";
import jetValidator from "jet-validator";
import { HomesRouter } from "./homes/HomesRouter";
import { AddressesRouter } from "./addresses/AddressesRouter";
import { UserPaymentsRouter } from "./payments/UserPaymentsRouter";
import { ShoppingSessionRouter } from "./cart/ShoppingSessionRouter";
import { OrdersController } from "./orders/OrdersController";
import { OrdersRouter } from "./orders/OrdersRouter";

export const userRouter = Router();
const validate = jetValidator();

// Fprward routes
userRouter.use(Paths.User.Homes.Base, HomesRouter);
userRouter.use(Paths.User.Orders.Base, OrdersRouter)
userRouter.use(Paths.User.Addresses.Base, AddressesRouter);
userRouter.use(Paths.User.Payments.Base, UserPaymentsRouter);
userRouter.use(Paths.User.Cart.Base, ShoppingSessionRouter);

// Get all users
userRouter.get(Paths.User.Base, UserController.getAll);

// Get all users
//userRouter.get('/', adminMw, UserController.getAll);

/* 
userRouter.get(
  Paths.Users.GetOne,
  //userMw, //!< TODO: Implement userMw
  UserController.getAll, //!< TODO: Implement/change to getOne
);

// Add one user
userRouter.post(
  Paths.Users.Add,
  adminMw,
  //validate(['user', User.isUser]),TODO
  UserController.add,
);

// Update one user
userRouter.put(
  Paths.Users.Update,
  adminMw,
  //validate(['user', User.isUser]),TODO
  UserController.update,
);

// Delete one user
userRouter.delete(
  Paths.Users.Delete,
  validate(['id', 'number', 'params']),
  adminMw,
  UserController.delete,
); */
