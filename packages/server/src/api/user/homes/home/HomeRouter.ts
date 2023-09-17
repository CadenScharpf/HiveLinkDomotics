import { Router } from "express";
import Paths from "@src/api/common/config/Paths";
import { HomeSchema } from "hive-link-common";
import { yupValidate } from "@src/api/common/middleware/yupValidate";
import HomeController from "./HomeController";
import { UserDevicesRouter } from "./devices/UserDevicesRouter";


export const homeRouter = Router({ mergeParams: true });



// Forward routes
homeRouter.use(Paths.User.Homes.Home.Devices.Base, UserDevicesRouter)

// Operations
homeRouter.get("/", HomeController.getOne)