import {Router} from "express";
import { RoomController } from "./RoomController";

export const RoomRouter = Router({mergeParams: true});

// RoomRouter.use(Paths.User.Homes.Home.Rooms.Room.Devices.Base, UserDevicesRouter)

RoomRouter.get('/', RoomController.getRoom);

