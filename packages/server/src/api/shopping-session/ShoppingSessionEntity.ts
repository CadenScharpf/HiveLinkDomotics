import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CartItemEntity } from "./CartItemEntity";
import { UserEntity } from "../user/entities/UserEntity";
import { IShoppingSession } from "hive-link-common";

@Index("FK_user_TO_shopping_session", ["userId"], {})
@Entity("shopping_session", { schema: "hivelink" })
export class ShoppingSessionEntity implements IShoppingSession {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id!: number;

  @Column("int", { name: "user_id" })
  userId!: number;

  @Column("decimal", { name: "total", precision: 10, scale: 2 })
  total!: number;

  @Column({ name: "created_at" })
  createdAt!: string;

  @Column( { name: "updated_at" })
  updatedAt!: string;

  @OneToMany(() => CartItemEntity, (cartItem) => cartItem.session)
  cartItems!: CartItemEntity[];

  @ManyToOne(() => UserEntity, (user) => user.shoppingSessions, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user!: UserEntity;
}
