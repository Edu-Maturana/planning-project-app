import * as jwt from "jsonwebtoken";
import envVars from "../config";

import User from "../models/user";

const secret = envVars.JWT_SECRET as string;

interface JwtPayload {
  id: string;
}

const validateJWT = async (req: any, res: any, next: any) => {
  const token = req.header("auth-token");

  if (!token) {
    return res.status(401).json({
      msg: "There is no token",
    });
  }

  try {
    const { id } = jwt.verify(token, secret) as JwtPayload;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(401).json({
        msg: "User not found",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "Token not valid",
    });
  }
};

export default validateJWT;
