import { UserEntity } from "../api/user/UserEntity";
import { CartItemEntity } from "../api/shopping-session/cart-item/CartItemEntity";
import { OrderDetails } from "./OrderDetails";
import { OrderItems } from "./OrderItems";
import { PaymentDetails } from "./PaymentDetails";
import { Product } from "./Product";
import { ProductCategory } from "./ProductCategory";
import { ProductDiscount } from "./ProductDiscount";
import { ProductInventory } from "./ProductInventory";
import { ShoppingSessionEntity } from "../api/shopping-session/ShoppingSessionEntity";
import { UserAddress } from "./UserAddress";
import { UserPayment } from "./UserPayment";

export const entities = [
  UserEntity,
  CartItemEntity,
  OrderDetails,
  OrderItems,
  PaymentDetails,
  Product,
  ProductCategory,
  ProductDiscount,
  ProductInventory,
  ShoppingSessionEntity,
  UserAddress,
  UserPayment,
];

export default entities;
