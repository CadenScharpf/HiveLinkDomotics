import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { OrderDetailsEntity } from "../../order/OrderDetailsEntity";
import { UserEntity } from "./UserEntity";
import { IUserAddress } from "hive-link-common";

@Index("FK_user_TO_user_address", ["userId"], {})
@Entity("user_address", { schema: "hivelink" })
export class UserAddressEntity implements IUserAddress {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id!: number;

  @Column("int", { name: "user_id" })
  userId!: number;

  @Column("varchar", { name: "address_line1", length: 255 })
  addressLine1!: string;

  @Column("varchar", { name: "address_line2", length: 255 })
  addressLine2!: string;

  @Column("varchar", { name: "city", length: 255 })
  city!: string;

  @Column("varchar", { name: "postal_code", length: 255 })
  postalCode!: string;

  @Column("varchar", { name: "country", length: 255 })
  country!: string;

  @Column("varchar", { name: "telephone", length: 20 })
  telephone!: string;

  @Column("varchar", { name: "mobile", nullable: true, length: 20 })
  mobile!: string | null;

  @Column({ name: "created_at" })
  createdAt!: string;

  @Column( { name: "updated_at" })
  updatedAt!: string; 

  @OneToMany(() => OrderDetailsEntity, (orderDetails) => orderDetails.address)
  orderDetails!: OrderDetailsEntity[];

  @ManyToOne(() => UserEntity, (user) => user.userAddresses, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user!: UserEntity;
}
