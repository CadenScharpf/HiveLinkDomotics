import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { OrderDetails } from "./OrderDetails";
import { Product } from "./Product";
import { IOrderItems } from "hive-link-common";

@Index("FK_order_details_TO_order_items", ["orderId"], {})
@Index("FK_product_TO_order_items", ["productId"], {})
@Entity("order_items", { schema: "hivelink" })
export class OrderItems implements IOrderItems {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id!: number;

  @Column("int", { name: "order_id" })
  orderId!: number;

  @Column("int", { name: "product_id" })
  productId!: number;

  @Column("int", { name: "quantity" })
  quantity!: number;

  @Column({ name: "created_at" })
  createdAt!: string;

  @Column( { name: "updated_at" })
  updatedAt!: string;

  @ManyToOne(() => OrderDetails, (orderDetails) => orderDetails.orderItems, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "order_id", referencedColumnName: "id" }])
  order!: OrderDetails;

  @ManyToOne(() => Product, (product) => product.orderItems, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "product_id", referencedColumnName: "id" }])
  product!: Product;
}
