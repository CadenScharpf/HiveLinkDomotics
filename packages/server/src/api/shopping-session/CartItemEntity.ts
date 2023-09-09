import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ProductEntity } from "../product/ProductEntity";
import { ShoppingSessionEntity } from "./ShoppingSessionEntity";
import { ICartItem } from "hive-link-common";

@Index("FK_product_TO_cart_item", ["productId"], {})
@Index("FK_shopping_session_TO_cart_item", ["sessionId"], {})
@Entity("cart_item", { schema: "hivelink" })
export class CartItemEntity implements ICartItem {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id!: number;

  @Column("int", { name: "session_id" })
  sessionId!: number;

  @Column("int", { name: "product_id" })
  productId!: number;

  @Column("int", { name: "quantity" })
  quantity!: number;

  @Column({ name: "created_at" })
  createdAt!: string;

  @Column( { name: "updated_at" })
  updatedAt!: string;

  @ManyToOne(() => ProductEntity, (product) => product.cartItems, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "product_id", referencedColumnName: "id" }])
  product!: ProductEntity;

  @ManyToOne(
    () => ShoppingSessionEntity,
    (shoppingSession) => shoppingSession.cartItems,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "session_id", referencedColumnName: "id" }])
  session!: ShoppingSessionEntity;
}
