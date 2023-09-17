import { Router } from "express";
import { ProductInventoriesController } from "./ProductInventoriesController";
import Paths from "@src/api/common/config/Paths";
import { ProductInventoryRouter } from "./Inventory/ProductInventoryRouter";

export const ProductInventoriesRouter = Router({ mergeParams: true });

ProductInventoriesRouter.use(Paths.Products.Inventories.Inventory.Base, ProductInventoryRouter)