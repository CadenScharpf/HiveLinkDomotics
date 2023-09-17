import { Request, RequestHandler, Router } from "express";
import Paths from "@src/api/common/config/Paths";
import HomesController from "./HomesController";
import { HomeSchema } from "hive-link-common";
import { yupValidate } from "@src/api/common/middleware/yupValidate";
import { homeRouter } from "./home/HomeRouter";
import { IReq } from "@src/api/common/types/types";

export const HomesRouter = Router({ mergeParams: true });


// Forward routes
HomesRouter.use(
    Paths.User.Homes.Home.Base,
    homeRouter
  );

// Operations
HomesRouter.get("/", HomesController.getAll);

HomesRouter.post("/", yupValidate(HomeSchema), HomesController.newHome);
