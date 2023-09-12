export * from "./src/User";
//export * from './src/DbInterface'; //{IProductReq, IProductRes, IProductCategoryReq, IProductCategoryRes, IProductDiscountReq, IProductDiscountRes, IProductInventoryReq, IProductInventoryRes, IShoppingSessionReq, IShoppingSessionRes} from './src/Products';
export * from "./src/Auth";
export {
  PrismaClient,
  user,
  cart_item,
  device,
  device_category,
  order_details,
  order_items,
  payment_details,
  product,
  product_category,
  product_discount,
  product_inventory,
  shopping_session,
  user_address,
  user_device,
  user_payment,
} from "@prisma/client";
