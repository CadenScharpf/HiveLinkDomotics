import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CartItemEntity } from "../shopping-session/CartItemEntity";
import { OrderItemsEntity } from "../order/OrderItemsEntity";
import { ProductCategoryEntity } from "./ProductCategoryEntity";
import { ProductDiscountEntity } from "./ProductDiscountEntity";
import { ProductInventoryEntity } from "./ProductInventoryEntity";
import { IProduct } from "hive-link-common";

@Index("FK_product_category_TO_product", ["categoryId"], {})
@Index("FK_product_discount_TO_product", ["discountId"], {})
@Index("FK_product_inventory_TO_product", ["inventoryId"], {})
@Entity("product", { schema: "hivelink" })
export class ProductEntity implements IProduct {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id!: number;

  @Column("int", { name: "category_id" })
  categoryId!: number;

  @Column("int", { name: "discount_id" })
  discountId!: number;

  @Column("int", { name: "inventory_id" })
  inventoryId!: number;

  @Column("varchar", { name: "name", length: 255 })
  name!: string;

  @Column("text", { name: "description", nullable: true })
  description!: string | null;

  @Column("varchar", { name: "sku", length: 255 })
  sku!: string;

  @Column("decimal", { name: "price", precision: 10, scale: 2 })
  price!: number;

  @Column("tinyint", { name: "active", width: 1 })
  active!: boolean;

  @Column({ name: "created_at" })
  createdAt!: string;

  @Column({ name: "updated_at" })
  updatedAt!: string;

  @OneToMany(() => CartItemEntity, (cartItem) => cartItem.product)
  cartItems!: CartItemEntity[];

  @OneToMany(() => OrderItemsEntity, (orderItems) => orderItems.product)
  orderItems!: OrderItemsEntity[];

  @ManyToOne(
    () => ProductCategoryEntity,
    (productCategory) => productCategory.products,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "category_id", referencedColumnName: "id" }])
  category!: ProductCategoryEntity;

  @ManyToOne(
    () => ProductDiscountEntity,
    (productDiscount) => productDiscount.products,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "discount_id", referencedColumnName: "id" }])
  discount!: ProductDiscountEntity;

  @ManyToOne(
    () => ProductInventoryEntity,
    (productInventory) => productInventory.products,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "inventory_id", referencedColumnName: "id" }])
  inventory!: ProductInventoryEntity;
}
