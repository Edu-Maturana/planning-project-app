import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

import User from "../models/user";
const bcrypt = require("bcrypt");

export const getUsers = async (req: Request, res: Response) => {
  const users = await User.findAll({
    attributes: {
      exclude: ["password", "createdAt", "updatedAt"],
    },
  });

  res.json(users);
};

export const getUser = async (req: Request, res: Response) => {
  const id = req.params.id;

  const user = await User.findByPk(id, {
    attributes: {
      exclude: ["password", "createdAt", "updatedAt"],
    },
  });

  if (!user) {
    res.status(404).json({ message: "User not found" });
  }

  res.json(user);
};

export const createUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

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

export const deleteUser = (req: Request, res: Response) => {
  const id = req.params.id;
  res.json({
    msg: `Delete user ${id}`,
    user: id,
  });
};
