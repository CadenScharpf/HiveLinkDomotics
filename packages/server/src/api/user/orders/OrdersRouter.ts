import { Router } from "express";
import {OrderRouter} from "./order/OrderRouter";
import Paths from "../../common/config/Paths";

export const OrdersRouter = Router({ mergeParams: true });

OrdersRouter.use(Paths.User.Orders.Order.Base, OrderRouter)