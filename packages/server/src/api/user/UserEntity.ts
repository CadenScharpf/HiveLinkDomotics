import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Repository } from "typeorm";
import { OrderDetails } from "../../entities/OrderDetails";
import { ShoppingSessionEntity } from "../shopping-session/ShoppingSessionEntity";
import { UserAddress } from "../../entities/UserAddress";
import { UserPayment } from "../../entities/UserPayment";
import { IUser } from "hive-link-common/src/DbInterface";
import { ISessionUser } from "hive-link-common";

@Entity("user", { schema: "hivelink" })
export class UserEntity implements IUser {

  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id!: number;

  @Column("varchar", { name: "email", length: 255 })
  email!: string;

  @Column("varchar", { name: "telephone", nullable: true, length: 20 })
  telephone!: string | null;

  @Column("varchar", { name: "first_name", length: 255 })
  firstName!: string;

  @Column("varchar", { name: "last_name", length: 255 })
  lastName!: string;

  @Column("int", { name: "role" })
  role!: number;

  @Column("varchar", { name: "auth_hash", nullable: true, length: 255 })
  authHash!: string | null;

  @Column({ name: "created_at" })
  createdAt!: string;

  @Column( { name: "updated_at" })
  updatedAt!: string;

  @OneToMany(() => OrderDetails, (orderDetails) => orderDetails.user)
  orderDetails!: OrderDetails[];

  @OneToMany(() => ShoppingSessionEntity, (shoppingSession) => shoppingSession.user)
  shoppingSessions!: ShoppingSessionEntity[];

  @OneToMany(() => UserAddress, (userAddress) => userAddress.user)
  userAddresses!: UserAddress[];

  @OneToMany(() => UserPayment, (userPayment) => userPayment.user)
  userPayments!: UserPayment[];

  constructor(user: IUser) {
    Object.assign(this, user);
  }

}
