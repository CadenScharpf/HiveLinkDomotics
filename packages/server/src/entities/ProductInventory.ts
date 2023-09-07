import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product";
import { IProductInventory } from "hive-link-common";

@Entity("product_inventory", { schema: "hivelink" })
export class ProductInventory implements IProductInventory {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id!: number;

  @Column("int", { name: "quantity" })
  quantity!: number;

  @Column({ name: "created_at" })
  createdAt!: string;

  @Column( { name: "updated_at" })
  updatedAt!: string;

  @OneToMany(() => Product, (product) => product.inventory)
  products!: Product[];
}
