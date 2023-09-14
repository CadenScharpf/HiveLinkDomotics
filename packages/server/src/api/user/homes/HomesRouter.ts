import { Router } from "express";
import { homeRouter } from "./home/HomeRouter";
import Paths from "@src/api/common/config/Paths";
import HomesController from "./HomesController";


export const homesRouter = Router();

// Forward routes
homesRouter.use(Paths.User.Homes.Home.Base, homeRouter)

// Operations
homesRouter.get("/",HomesController.getAll);


