import { Response, Request } from "express";
const bcrypt = require("bcrypt");

import User from "../models/user";
import generateJWT from "../helpers/generateJWT";

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "Missing parameters" });
  }

  const user = await User.findOne({ where: { email } });

  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    res.status(401).json({ message: "Invalid password" });
  }

  const token = generateJWT(user);

  res.json({
    token,
  });
};

export default login;
