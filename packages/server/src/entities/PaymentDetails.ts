import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderDetails } from "./OrderDetails";
import { IPaymentDetails } from "hive-link-common";

@Entity("payment_details", { schema: "hivelink" })
export class PaymentDetails implements IPaymentDetails {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id!: number;

  @Column("int", { name: "user_payment_id" })
  userPaymentId!: number;

  @Column("decimal", { name: "amount", precision: 10, scale: 2 })
  amount!: number;

  @Column("varchar", { name: "status", length: 255 })
  status!: string;

  @Column({ name: "created_at" })
  createdAt!: string;

  @Column( { name: "updated_at" })
  updatedAt!: string;

  @OneToMany(() => OrderDetails, (orderDetails) => orderDetails.payment)
  orderDetails!: OrderDetails[];
}
