import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

import User from "../models/user";
const bcrypt = require("bcrypt");

export const getUsers = async (req: Request, res: Response) => {
  const users = await User.findAll();

  res.json(users);
};

export const getUser = async (req: Request, res: Response) => {
  const id = req.params.id;

  const user = await User.findByPk(id);

  if (!user) {
    res.status(404).json({ message: "User not found" });
  }

  res.json(user);
};

export const createUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({ message: "Missing parameters" });
  }

  // Encrypt password
  const encrypted = await bcrypt.hash(password, 10);

  const user = await User.create({
    id: uuidv4(),
    name,
    email,
    password: encrypted,
  });

  res.json({
    msg: "User signed up successfully!",
    user,
  });
};

export const updateUser = (req: Request, res: Response) => {
  // const id = req.params.id;

  // TODO Verify if user is the same that is trying to update
};

export const deleteUser = (req: Request, res: Response) => {
  const id = req.params.id;
  res.json({
    msg: `Delete user ${id}`,
    user: id,
  });
};
