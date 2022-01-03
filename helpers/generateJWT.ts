import * as jwt from "jsonwebtoken";

import envVars from "../config";

const secretKey = envVars.JWT_SECRET as string;

// generateJWT
export const generateJWT = (id: string) => {
  const token = jwt.sign({ id }, secretKey, {
    expiresIn: "365d",
  });

  return token;
}

export default generateJWT;
  