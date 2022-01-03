import { Sequelize } from "sequelize";

import envVars from "../config";

const database = envVars.DB_NAME as string;
const user = envVars.DB_USER as string;
const password = envVars.DB_PASS as string;
const host = envVars.DB_HOST as string;

const connection = new Sequelize(database, user, password, {
  host,
  dialect: "mysql",
});

export default connection;
