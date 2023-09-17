import { Router } from "express";
import { ProductsController } from "./ProductsController";
import Paths from "../common/config/Paths";
import { ProductRouter } from "./product/ProductRouter";
import { ProductCategoriesRouter } from "./categories/ProductCategoriesRouter";
import { ProductDiscountsRouter } from "./discounts/ProductDiscountsRouter";
import { ProductInventoriesRouter } from "./inventories/ProductInventoriesRouter";

export const ProductsRouter = Router({ mergeParams: true });

ProductsRouter.use(Paths.Products.Product.Base, ProductRouter)
ProductsRouter.use(Paths.Products.Categories.Category.Base, ProductCategoriesRouter)
ProductsRouter.use(Paths.Products.Discounts.Discount.Base, ProductDiscountsRouter)
ProductsRouter.use(Paths.Products.Inventories.Base, ProductInventoriesRouter)