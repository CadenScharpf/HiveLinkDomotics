import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { DeviceCategory } from "./DeviceCategory";
import { UserDevice } from "./UserDevice";

@Index("FK_device_category_TO_device", ["categoryId"], {})
@Entity("device", { schema: "hivelink" })
export class Device {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "category_id" })
  categoryId: number;

  @Column("varchar", { name: "manufacturer", length: 20 })
  manufacturer: string;

  @Column("varchar", { name: "model", nullable: true, length: 20 })
  model: string | null;

  @Column("varchar", { name: "name", nullable: true, length: 50 })
  name: string | null;

  @Column("text", { name: "description", nullable: true })
  description: string | null;

  @Column("timestamp", { name: "created_at" })
  createdAt: Date;

  @Column("timestamp", { name: "updated_at" })
  updatedAt: Date;

  @ManyToOne(() => DeviceCategory, (deviceCategory) => deviceCategory.devices, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "category_id", referencedColumnName: "id" }])
  category: DeviceCategory;

  @OneToMany(() => UserDevice, (userDevice) => userDevice.device)
  userDevices: UserDevice[];
}
