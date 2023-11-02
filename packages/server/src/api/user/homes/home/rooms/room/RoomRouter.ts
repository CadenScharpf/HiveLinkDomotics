import {Router} from "express";
import { RoomController } from "./RoomController";
import Paths from "@src/api/common/config/Paths";

export const RoomRouter = Router({mergeParams: true});


RoomRouter.get('/', RoomController.getRoom);

RoomRouter.get('/devices', RoomController.getDevices);


