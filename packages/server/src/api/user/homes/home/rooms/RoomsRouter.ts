import Paths from "@src/api/common/config/Paths";
import {Router} from "express";
import { RoomRouter } from "./room/RoomRouter";
import { RoomsController } from "./RoomsController";

export const RoomsRouter = Router({mergeParams: true});

RoomsRouter.use(Paths.User.Homes.Home.Rooms.Room.Base, RoomRouter)

RoomsRouter.get('/', RoomsController.getAll);