import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderDetails } from "./OrderDetails";
import { ShoppingSession } from "./ShoppingSession";
import { UserAddress } from "./UserAddress";
import { UserDevice } from "./UserDevice";
import { UserPayment } from "./UserPayment";

@Entity("user", { schema: "hivelink" })
export class User {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "email", length: 255 })
  email: string;

  @Column("varchar", { name: "telephone", nullable: true, length: 20 })
  telephone: string | null;

  @Column("varchar", { name: "first_name", length: 255 })
  firstName: string;

  @Column("varchar", { name: "last_name", length: 255 })
  lastName: string;

  @Column("int", { name: "role" })
  role: number;

  @Column("varchar", { name: "auth_hash", length: 255 })
  authHash: string;

  @Column("timestamp", { name: "created_at" })
  createdAt: Date;

  @Column("timestamp", { name: "updated_at" })
  updatedAt: Date;

  @OneToMany(() => OrderDetails, (orderDetails) => orderDetails.user)
  orderDetails: OrderDetails[];

  @OneToMany(() => ShoppingSession, (shoppingSession) => shoppingSession.user)
  shoppingSessions: ShoppingSession[];

  @OneToMany(() => UserAddress, (userAddress) => userAddress.user)
  userAddresses: UserAddress[];

  @OneToMany(() => UserDevice, (userDevice) => userDevice.user)
  userDevices: UserDevice[];

  @OneToMany(() => UserPayment, (userPayment) => userPayment.user)
  userPayments: UserPayment[];
}
