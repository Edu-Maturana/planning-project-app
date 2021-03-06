import * as dotenv from "dotenv";

dotenv.config();

const envVars = {
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_PASS: process.env.DB_PASS,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,

  PORT: process.env.PORT,

  JWT_SECRET: process.env.JWT_SECRET,

  CLOUDINARY_URL: process.env.CLOUDINARY_URL,
};

export default envVars;