import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product";
import { IProductCategory } from "hive-link-common";

@Entity("product_category", { schema: "hivelink" })
export class ProductCategory implements IProductCategory {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id!: number;

  @Column("varchar", { name: "name", length: 255 })
  name!: string;

  @Column("text", { name: "description", nullable: true })
  description!: string | null;

  @Column({ name: "created_at" })
  createdAt!: string;

  @Column( { name: "updated_at" })
  updatedAt!: string;
  @OneToMany(() => Product, (product) => product.category)
  products!: Product[];
}
