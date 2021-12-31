import { Sequelize } from "sequelize";

import dbConfig from "../config";

const database = dbConfig.name;
const user = dbConfig.user;
const password = dbConfig.password;
const host = dbConfig.host;

const connection = new Sequelize(database, user, password, {
  host,
  dialect: "mysql",
});

export default connection;
