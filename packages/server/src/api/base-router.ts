import { Router } from "express";
import jetValidator from "jet-validator";

import Paths from "./common/config/Paths";
import { authRouter } from "./auth/AuthRouter";
import { userRouter } from "./user/UserRouter";
import { ProductsRouter } from "./products/ProductsRouter";

// **** Variables **** //

const apiRouter = Router();

// Add AuthRouter
apiRouter.use(Paths.Auth.Base, authRouter);


// Add UserRouter
apiRouter.use(Paths.User.Base, userRouter);

apiRouter.use(Paths.Products.Base, ProductsRouter);

// **** Export default **** //

export default apiRouter;
