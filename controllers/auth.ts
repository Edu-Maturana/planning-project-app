import { Response, Request } from "express";
import { v4 as uuidv4 } from "uuid";
const bcrypt = require("bcrypt");

import User from "../models/user";
import generateJWT from "../helpers/generateJWT";

export const signUp = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  // Check if user exists
  const userExists = await User.findOne({
    where: {
      email,
    },
  });

  if (userExists) {
    return res.status(409).json({
      msg: "User already exists",
    });
  }

  // Encrypt password
  const encrypted = await bcrypt.hash(password, 10);

  let user = await User.create({
    id: uuidv4(),
    name,
    email,
    password: encrypted,
  });

  const { id, name: userName, email: userEmail } = user;

  res.json({
    msg: "User signed up successfully!",
    user: {
      id,
      name: userName,
      email: userEmail,
    },
  });
};


export const logIn = async (req: Request, res: Response) => {
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

  const token = generateJWT(user.id);

  const data = {
    id: user.id,
    name: user.name,
    email: user.email,
    token,
  }

  res.json({
    data
  });
};
