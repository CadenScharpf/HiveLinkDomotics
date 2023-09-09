import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderDetails } from "./OrderDetails";

@Entity("payment_details", { schema: "hivelink" })
export class PaymentDetails {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "user_payment_id" })
  userPaymentId: number;

  @Column("decimal", { name: "amount", precision: 10, scale: 2 })
  amount: string;

  @Column("varchar", { name: "status", length: 255 })
  status: string;

  @Column("timestamp", { name: "created_at" })
  createdAt: Date;

  @Column("timestamp", { name: "updated_at" })
  updatedAt: Date;

  @OneToMany(() => OrderDetails, (orderDetails) => orderDetails.payment)
  orderDetails: OrderDetails[];
}
