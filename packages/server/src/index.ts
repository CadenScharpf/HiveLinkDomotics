import "./pre-start"; // Must be the first import
import logger from "jet-logger";

import EnvVars from "@src/constants/EnvVars";
import server from "./server";

import { PrismaClient } from 'hive-link-common';


// **** Run **** //

const SERVER_START_MSG =
  "Express server started on port: " + EnvVars.Port.toString();

//dbTest();

server.listen(EnvVars.Port, () => logger.info(SERVER_START_MSG));

async function dbTest() {
  const prisma = new PrismaClient();
prisma.user.findMany().then((users) => console.log(users)).catch((error) => console.log(error))
prisma.cart_item.findMany().then((cart_items) => console.log(cart_items)).catch((error) => console.log(error))
prisma.device.findMany().then((res) => console.log(res)).catch((error) => console.log(error))
prisma.device_category.findMany().then((res) => console.log(res)).catch((error) => console.log(error))
prisma.order_details.findMany().then((res) => console.log(res)).catch((error) => console.log(error))
prisma.order_items.findMany().then((res) => console.log(res)).catch((error) => console.log(error))
prisma.payment_details.findMany().then((res) => console.log(res)).catch((error) => console.log(error))
prisma.product.findMany().then((res) => console.log(res)).catch((error) => console.log(error))
prisma.product_category.findMany().then((res) => console.log(res)).catch((error) => console.log(error))
prisma.product_discount.findMany().then((res) => console.log(res)).catch((error) => console.log(error))
prisma.product_inventory.findMany().then((res) => console.log(res)).catch((error) => console.log(error))
prisma.shopping_session.findMany().then((res) => console.log(res)).catch((error) => console.log(error))
prisma.user_address.findMany().then((res) => console.log(res)).catch((error) => console.log(error))
prisma.user_device.findMany().then((res) => console.log(res)).catch((error) => console.log(error))
prisma.user_payment.findMany().then((res) => console.log(res)).catch((error) => console.log(error))
prisma.user_home.findMany().then((res) => console.log(res)).catch((error) => console.log(error))
}