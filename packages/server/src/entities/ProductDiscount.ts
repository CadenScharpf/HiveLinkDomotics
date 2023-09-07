import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product";
import { IProductDiscount } from "hive-link-common";

@Entity("product_discount", { schema: "hivelink" })
export class ProductDiscount implements IProductDiscount{
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id!: number;

  @Column("varchar", { name: "name", length: 255 })
  name!: string;

  @Column("text", { name: "description", nullable: true })
  description!: string | null;

  @Column("decimal", { name: "percent", precision: 10, scale: 2 })
  percent!: number;

  @Column("tinyint", { name: "active", width: 1 })
  active!: boolean;

  @Column({ name: "created_at" })
  createdAt!: string;

  @Column( { name: "updated_at" })
  updatedAt!: string;

  @OneToMany(() => Product, (product) => product.discount)
  products!: Product[];
}
