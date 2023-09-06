import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product";

@Entity("product_discount", { schema: "hivelink" })
export class ProductDiscount {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id!: number;

  @Column("varchar", { name: "name", length: 255 })
  name!: string;

  @Column("text", { name: "description", nullable: true })
  description!: string | null;

  @Column("decimal", { name: "percent", precision: 10, scale: 2 })
  percent!: string;

  @Column("tinyint", { name: "active", width: 1 })
  active!: boolean;

  @Column("timestamp", { name: "created_at" })
  createdAt!: Date;

  @Column("timestamp", { name: "updated_at" })
  updatedAt!: Date;

  @OneToMany(() => Product, (product) => product.discount)
  products!: Product[];
}
