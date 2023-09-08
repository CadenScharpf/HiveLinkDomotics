import "reflect-metadata"
import { DataSource } from "typeorm"
import entities from "./api/common/repo/Entities"

class DataSourceSingleton {
    private static instance: DataSourceSingleton;
    private readonly dataSource: DataSource;
  
    private constructor() {
      // Initialize your data source here
      this.dataSource = new DataSource({
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
      });
    }
  
    public static getInstance(): DataSourceSingleton {
      if (!DataSourceSingleton.instance) {
        DataSourceSingleton.instance = new DataSourceSingleton();
      }
      return DataSourceSingleton.instance;
    }
  
    public getDataSource(): DataSource {
      return this.dataSource;
    }
  }
  
  const AppDataSource = DataSourceSingleton.getInstance();
  
  export { AppDataSource };