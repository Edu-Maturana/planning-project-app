import * as jwt from "jsonwebtoken";
import envVars from "../config";

import User from "../models/user";

const secret = envVars.JWT_SECRET as string;

interface JwtPayload {
    id: string;
}

const validateJWT = async (req: any, res: any, next: any) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Missing token" });
  }

  try {
    const { id } = jwt.verify(token, secret) as JwtPayload;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(401).json({
        msg: "The user does not exist",
      });
    }

  } catch (error) {
    return res.status(401).json({
      msg: "Token no válido",
    });
  }
};

export default validateJWT;
