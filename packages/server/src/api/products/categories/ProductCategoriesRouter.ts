import {Router} from 'express';
import Paths from '@src/api/common/config/Paths';
import { ProductCategoryRouter } from './category/ProductCategoryRouter';

export const ProductCategoriesRouter = Router({ mergeParams: true });

ProductCategoriesRouter.use(Paths.Products.Categories.Category.Base, ProductCategoryRouter);