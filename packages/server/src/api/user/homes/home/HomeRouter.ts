import { Router } from "express";
import Paths from "@src/api/common/config/Paths";
import { HomeSchema } from "hive-link-common";
import { yupValidate } from "@src/api/common/middleware/yupValidate";
import HomeController from "./HomeController";
import { UserDevicesRouter } from "./rooms/room/devices/UserDevicesRouter";
import { RoomsRouter } from "./rooms/RoomsRouter";


export const homeRouter = Router({ mergeParams: true });



// Forward routes
homeRouter.use(Paths.User.Homes.Home.Rooms.Base, RoomsRouter)

// Operations
homeRouter.get("/", HomeController.getOne)