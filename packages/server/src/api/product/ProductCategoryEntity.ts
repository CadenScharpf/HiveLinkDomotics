import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductEntity } from "./ProductEntity";
import { IProductCategory } from "hive-link-common";

@Entity("product_category", { schema: "hivelink" })
export class ProductCategoryEntity implements IProductCategory {
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
  @OneToMany(() => ProductEntity, (product) => product.category)
  products!: ProductEntity[];
}
