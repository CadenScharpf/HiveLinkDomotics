import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CartItem } from "./CartItem";
import { OrderItems } from "./OrderItems";
import { ProductCategory } from "./ProductCategory";
import { ProductDiscount } from "./ProductDiscount";
import { ProductInventory } from "./ProductInventory";

@Index("FK_product_category_TO_product", ["categoryId"], {})
@Index("FK_product_discount_TO_product", ["discountId"], {})
@Index("FK_product_inventory_TO_product", ["inventoryId"], {})
@Entity("product", { schema: "hivelink" })
export class Product {
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
  price!: string;

  @Column("tinyint", { name: "active", width: 1 })
  active!: boolean;

  @Column("timestamp", { name: "created_at" })
  createdAt!: Date;

  @Column("timestamp", { name: "updated_at" })
  updatedAt!: Date;

  @OneToMany(() => CartItem, (cartItem) => cartItem.product)
  cartItems!: CartItem[];

  @OneToMany(() => OrderItems, (orderItems) => orderItems.product)
  orderItems!: OrderItems[];

  @ManyToOne(
    () => ProductCategory,
    (productCategory) => productCategory.products,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "category_id", referencedColumnName: "id" }])
  category!: ProductCategory;

  @ManyToOne(
    () => ProductDiscount,
    (productDiscount) => productDiscount.products,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "discount_id", referencedColumnName: "id" }])
  discount!: ProductDiscount;

  @ManyToOne(
    () => ProductInventory,
    (productInventory) => productInventory.products,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "inventory_id", referencedColumnName: "id" }])
  inventory!: ProductInventory;
}