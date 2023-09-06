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
import { User } from "./User";
import { IShoppingSession } from "hive-link-common";

@Index("FK_user_TO_shopping_session", ["userId"], {})
@Entity("shopping_session", { schema: "hivelink" })
export class ShoppingSession implements IShoppingSession {
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

  @OneToMany(() => CartItem, (cartItem) => cartItem.session)
  cartItems!: CartItem[];

  @ManyToOne(() => User, (user) => user.shoppingSessions, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user!: User;
}
