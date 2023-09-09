import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Device } from "./Device";
import { Product } from "./Product";
import { User } from "./User";

@Index("FK_device_TO_user_device", ["deviceId"], {})
@Index("FK_product_TO_user_device", ["productId"], {})
@Index("FK_user_TO_user_device", ["userId"], {})
@Entity("user_device", { schema: "hivelink" })
export class UserDevice {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "user_id" })
  userId: number;

  @Column("int", { name: "device_id" })
  deviceId: number;

  @Column("int", { name: "product_id", nullable: true })
  productId: number | null;

  @Column("varchar", { name: "name", length: 50 })
  name: string;

  @Column("timestamp", { name: "last_conn", nullable: true })
  lastConn: Date | null;

  @Column("timestamp", { name: "created_at" })
  createdAt: Date;

  @Column("timestamp", { name: "updated_at" })
  updatedAt: Date;

  @ManyToOne(() => Device, (device) => device.userDevices, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "device_id", referencedColumnName: "id" }])
  device: Device;

  @ManyToOne(() => Product, (product) => product.userDevices, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "product_id", referencedColumnName: "id" }])
  product: Product;

  @ManyToOne(() => User, (user) => user.userDevices, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: User;
}
