import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UserEntity } from "../api/user/UserEntity";
import { IUserPayment } from "hive-link-common";

@Index("FK_user_TO_user_payment", ["userId"], {})
@Entity("user_payment", { schema: "hivelink" })
export class UserPayment implements IUserPayment{
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id!: number;

  @Column("int", { name: "user_id" })
  userId!: number;

  @Column("varchar", { name: "payment_type", length: 255 })
  paymentType!: string;

  @Column("varchar", { name: "account_no", length: 255 })
  accountNo!: string;

  @Column("varchar", { name: "provider", length: 255 })
  provider!: string;

  @Column("date", { name: "expiry" })
  expiry!: string;

  @Column({ name: "created_at" })
  createdAt!: string;

  @Column( { name: "updated_at" })
  updatedAt!: string;

  @ManyToOne(() => UserEntity, (user) => user.userPayments, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user!: UserEntity;
}
