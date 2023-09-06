import { User } from "./User";
import { CartItem } from "./CartItem";
import { OrderDetails } from "./OrderDetails";
import { OrderItems } from "./OrderItems";
import { PaymentDetails } from "./PaymentDetails";
import { Product } from "./Product";
import { ProductCategory } from "./ProductCategory";
import { ProductDiscount } from "./ProductDiscount";
import { ProductInventory } from "./ProductInventory";
import { ShoppingSession } from "./ShoppingSession";
import { UserAddress } from "./UserAddress";
import { UserPayment } from "./UserPayment";

export const entities = [
  User,
  CartItem,
  OrderDetails,
  OrderItems,
  PaymentDetails,
  Product,
  ProductCategory,
  ProductDiscount,
  ProductInventory,
  ShoppingSession,
  UserAddress,
  UserPayment,
];

export default entities;
