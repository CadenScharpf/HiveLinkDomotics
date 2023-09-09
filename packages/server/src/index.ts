import "./pre-start"; // Must be the first import
import logger from "jet-logger";

import EnvVars from "@src/constants/EnvVars";
import server from "./server";
import { AppDataSource } from "./data-source";
import entities from "./api/common/repo/Entities";

// **** Run **** //

const SERVER_START_MSG =
  "Express server started on port: " + EnvVars.Port.toString();

  const dataSource = AppDataSource.getDataSource()

dataSource.initialize()
  .then(async () => {
    entities.map(async (entity) => {
      const table = await dataSource.manager.find(entity);
      console.log(`Loaded ${entity.name}s`, table);
    });
  })
  .catch((error) => console.log(error));

server.listen(EnvVars.Port, () => logger.info(SERVER_START_MSG));
