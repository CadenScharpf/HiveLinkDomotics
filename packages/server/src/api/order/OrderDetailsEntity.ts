import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { PaymentDetailsEntity } from "./PaymentDetailsEntity";
import { UserAddressEntity } from "../user/entities/UserAddressEntity";
import { UserEntity } from "../user/entities/UserEntity";
import { OrderItemsEntity } from "./OrderItemsEntity";
import { IOrderDetails } from "hive-link-common";

@Index("FK_payment_details_TO_order_details", ["paymentId"], {})
@Index("FK_user_address_TO_order_details", ["addressId"], {})
@Index("FK_user_TO_order_details", ["userId"], {})
@Entity("order_details", { schema: "hivelink" })
export class OrderDetailsEntity implements IOrderDetails {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id!: number;

  @Column("int", { name: "user_id" })
  userId!: number;

  @Column("int", { name: "payment_id" })
  paymentId!: number;

  @Column("int", { name: "address_id" })
  addressId!: number;

  @Column("decimal", { name: "total", precision: 10, scale: 2 })
  total!: number;

  @Column({ name: "created_at" })
  createdAt!: string;

  @Column( { name: "updated_at" })
  updatedAt!: string;

  @ManyToOne(
    () => PaymentDetailsEntity,
    (paymentDetails) => paymentDetails.orderDetails,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "payment_id", referencedColumnName: "id" }])
  payment!: PaymentDetailsEntity;

  @ManyToOne(() => UserAddressEntity, (userAddress) => userAddress.orderDetails, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "address_id", referencedColumnName: "id" }])
  address!: UserAddressEntity;

  @ManyToOne(() => UserEntity, (user) => user.orderDetails, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user!: UserEntity;

  @OneToMany(() => OrderItemsEntity, (orderItems) => orderItems.order)
  orderItems!: OrderItemsEntity[];
}
