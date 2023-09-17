import { Router } from "express";
import { ProductController } from "./ProductController";
import Paths from "@src/api/common/config/Paths";

export const ProductRouter = Router({ mergeParams: true });

ProductRouter.use(Paths.Products.Product.Base, ProductRouter);
