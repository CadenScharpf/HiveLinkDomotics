import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { DeviceCategoryEntity } from "./DeviceCategoryEntity";
import { UserDeviceEntity } from "../user/entities/UserDeviceEntity";

@Index("FK_device_category_TO_device", ["categoryId"], {})
@Entity("device", { schema: "hivelink" })
export class DeviceEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id!: number;

  @Column("int", { name: "category_id" })
  categoryId!: number;

  @Column("varchar", { name: "manufacturer", length: 20 })
  manufacturer!: string;

  @Column("varchar", { name: "model", nullable: true, length: 20 })
  model!: string | null;

  @Column("varchar", { name: "name", nullable: true, length: 50 })
  name!: string | null;

  @Column("text", { name: "description", nullable: true })
  description!: string | null;

  @Column("timestamp", { name: "created_at" })
  createdAt!: Date;

  @Column("timestamp", { name: "updated_at" })
  updatedAt!: Date;

  @ManyToOne(() => DeviceCategoryEntity, (deviceCategory) => deviceCategory.devices, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "category_id", referencedColumnName: "id" }])
  category!: DeviceCategoryEntity;

  @OneToMany(() => UserDeviceEntity, (userDevice) => userDevice.device)
  userDevices!: UserDeviceEntity[];
}
