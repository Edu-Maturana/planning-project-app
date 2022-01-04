import * as dotenv from "dotenv";

dotenv.config();

const envVars = {
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_PASS: process.env.DB_PASS,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,

  JWT_SECRET: process.env.JWT_SECRET,

  AWS_BUCKET: process.env.AWS_BUCKET,
  AWS_ACCESS: process.env.AWS_ACCESS,
  AWS_SECRET: process.env.AWS_SECRET,
};

export default envVars;