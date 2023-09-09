import { UserEntity } from "../../user/entities/UserEntity";
import { CartItemEntity } from "../../shopping-session/CartItemEntity";
import { OrderDetailsEntity } from "../../order/OrderDetailsEntity";
import { OrderItemsEntity } from "../../order/OrderItemsEntity";
import { PaymentDetailsEntity } from "../../order/PaymentDetailsEntity";
import { ProductEntity } from "../../product/ProductEntity";
import { ProductCategoryEntity } from "../../product/ProductCategoryEntity";
import { ProductDiscountEntity } from "../../product/ProductDiscountEntity";
import { ProductInventoryEntity } from "../../product/ProductInventoryEntity";
import { ShoppingSessionEntity } from "../../shopping-session/ShoppingSessionEntity";
import { UserAddressEntity } from "../../user/entities/UserAddressEntity";
import { UserPaymentEntity } from "../../user/entities/UserPaymentEntity";

export const entities = [
  UserEntity,
  CartItemEntity,
  OrderDetailsEntity,
  OrderItemsEntity,
  PaymentDetailsEntity,
  ProductEntity,
  ProductCategoryEntity,
  ProductDiscountEntity,
  ProductInventoryEntity,
  ShoppingSessionEntity,
  UserAddressEntity,
  UserPaymentEntity,
];

export default entities;
