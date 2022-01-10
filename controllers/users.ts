import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
const bcrypt = require("bcrypt");

import User from "../models/user";
import Workspace from "../models/workspace";

export const getTeammates = async (req: any, res: Response) => {
  const { id } = req.user;

  const user = await User.findByPk(id);

  if (!user) {
    return res.status(404).json({
      msg: "User not found",
    });
  }

  const membership = user.isMember[0];

  const workspace = await Workspace.findByPk(membership);

  if (!workspace) {
    return res.status(404).json({
      msg: "Workspace not found",
    });
  }

  const teammates = workspace.members;

  // filter out the current user
  const filteredTeammates = teammates.filter((teammate: any) => {
    return teammate !== id;
  });
 
  res.json({
    teammates: filteredTeammates,
  });
};

export const getTeammate = async (req: any, res: Response) => {
  const { id } = req.params;
  const user = req.user.id;

  // verify that the user exists and is a teammate of the current user
  const teammate = await User.findByPk(id);

  if (!teammate) {
    return res.status(404).json({
      msg: "User not found",
    });
  }
 
  const currentUser = await User.findByPk(user);

  if (currentUser.isMember[0] == teammate.isMember[0]) {
    return res.status(200).json({
      teammate,
    });
  }

  return res.status(401).json({
    msg: "You are not a teammate of this user",
  });
};

export const createUser = async (req: Request, res: Response) => {
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

export const deleteUser = (req: Request, res: Response) => {
  const id = req.params.id;
  res.json({
    msg: `Delete user ${id}`,
    user: id,
  });
};
