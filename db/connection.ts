import { Sequelize } from "sequelize";

const database = process.env.DB_NAME as string;
const user = process.env.DB_USER as string;
const password = process.env.DB_PASS as string;
const host = process.env.DB_HOST as string;

const connection = new Sequelize(database, user, password, {
  host,
  dialect: "mysql",
});

export default connection;
