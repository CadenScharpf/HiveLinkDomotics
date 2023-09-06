import "./pre-start"; // Must be the first import
import logger from "jet-logger";

import EnvVars from "@src/constants/EnvVars";
import server from "./server";
import { AppDataSource } from "./data-source";
import entities from "./models/Entities";

// **** Run **** //

const SERVER_START_MSG =
  "Express server started on port: " + EnvVars.Port.toString();

AppDataSource.initialize()
  .then(async () => {
    /*     console.log("Inserting a new user into the database...")
      
      user.firstName = "Timber"
      user.lastName = "Saw"
      user.age = 25
      await AppDataSource.manager.save(user)
      console.log("Saved a new user with id: " + user.id)
  
      console.log("Loading users from the database...")*/
    //

    entities.map(async (entity) => {
      const table = await AppDataSource.manager.find(entity);
      console.log(`Loaded ${entity.name}s`, table);
    });
  })
  .catch((error) => console.log(error));

server.listen(EnvVars.Port, () => logger.info(SERVER_START_MSG));
