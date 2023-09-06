import "reflect-metadata"
import { DataSource } from "typeorm"
import entities from "./models/Entities"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "database",
    port: 3306,
    username: "docker",
    password: "docker",
    database: "hivelink",
    synchronize: false,
    logging: false,
    entities: entities,
    migrations: [],
    subscribers: [],
})