import {Router} from 'express';
import Paths from '@src/api/common/config/Paths';

export const ProductDiscountsRouter = Router({ mergeParams: true });

ProductDiscountsRouter.use(Paths.Products.Discounts.Discount.Base, ProductDiscountsRouter)
