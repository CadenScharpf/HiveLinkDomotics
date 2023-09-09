import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderDetailsEntity } from "./OrderDetailsEntity";
import { IPaymentDetails } from "hive-link-common";

@Entity("payment_details", { schema: "hivelink" })
export class PaymentDetailsEntity implements IPaymentDetails {
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

  @OneToMany(() => OrderDetailsEntity, (orderDetails) => orderDetails.payment)
  orderDetails!: OrderDetailsEntity[];
}
