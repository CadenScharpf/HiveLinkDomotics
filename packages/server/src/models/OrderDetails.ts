import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { PaymentDetails } from "./PaymentDetails";
import { UserAddress } from "./UserAddress";
import { User } from "./User";
import { OrderItems } from "./OrderItems";

@Index("FK_payment_details_TO_order_details", ["paymentId"], {})
@Index("FK_user_address_TO_order_details", ["addressId"], {})
@Index("FK_user_TO_order_details", ["userId"], {})
@Entity("order_details", { schema: "hivelink" })
export class OrderDetails {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id!: number;

  @Column("int", { name: "user_id" })
  userId!: number;

  @Column("int", { name: "payment_id" })
  paymentId!: number;

  @Column("int", { name: "address_id" })
  addressId!: number;

  @Column("decimal", { name: "total", precision: 10, scale: 2 })
  total!: string;

  @Column("timestamp", { name: "created_at" })
  createdAt!: Date;

  @Column("timestamp", { name: "updated_at" })
  updatedAt!: Date;

  @ManyToOne(
    () => PaymentDetails,
    (paymentDetails) => paymentDetails.orderDetails,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "payment_id", referencedColumnName: "id" }])
  payment!: PaymentDetails;

  @ManyToOne(() => UserAddress, (userAddress) => userAddress.orderDetails, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "address_id", referencedColumnName: "id" }])
  address!: UserAddress;

  @ManyToOne(() => User, (user) => user.orderDetails, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user!: User;

  @OneToMany(() => OrderItems, (orderItems) => orderItems.order)
  orderItems!: OrderItems[];
}
