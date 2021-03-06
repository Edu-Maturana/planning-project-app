import { Response } from "express";
import { v4 as uuidv4 } from "uuid";

import Workspace from "../models/workspace";
import User from "../models/user";

export const getWorkspaces = async (req: any, res: Response) => {
  const { id } = req.user;

  const user = await User.findByPk(id);

  if (!user) {
    return res.status(404).json({
      msg: "User not found",
    });
  }

  const workspaces = await Workspace.findAll({
    where: {
      id: user.isMember[0],
    },
  });

  if (!workspaces) {
    return res.status(404).json({
      msg: "You are not a member of any workspace",
    });
  }

  res.json({
    workspaces,
  });
};

export const createWorkspace = async (req: any, res: Response) => {
  const { name, description } = req.body;

  const owner = req.user.id;

  // verify if user already has a workspace
  const user = await User.findByPk(owner);

  if (user.isMember.length > 0) {
    return res.status(400).json({
      msg: "User already has a workspace",
    });
  }

  if (!owner) {
    return res.status(401).json({
      msg: "There is no user logged in",
    });
  }

  const workspace = await Workspace.create({
    id: uuidv4(),
    name,
    description,
    owner,
    members: [owner],
  });

  await owner.update ({
    isMember: [...owner.isMember, workspace.id]
  });

  const data = {
    id: workspace.id,
    name: workspace.name,
    description: workspace.description,
    owner: workspace.owner,
    members: workspace.members,
  };

  res.json({
    msg: "Workspace created successfully",
    data,
  });
};

export const addMember = async (req: any, res: Response) => {
  const { userId } = req.body;
  const workspaceId = req.params.id;

  const workspace = await Workspace.findByPk(workspaceId);

  if (!workspace) {
    return res.status(404).json({
      msg: "Workspace not found",
    });
  }

  if (workspace.owner !== req.user.id) {
    return res.status(401).json({
      msg: "You are not the owner of this workspace",
    });
  }

  const user = await User.findByPk(userId);

  if (!user) {
    return res.status(404).json({
      msg: "User not found",
    });
  }

  if (workspace.members.includes(userId)) {
    return res.status(400).json({
      msg: "User is already a member of this workspace",
    });
  }

  const updatedWorkspace = await workspace.update({
    members: [...workspace.members, userId],
  });

  const memberAdded = await user.update({
    isMember: [...user.isMember, workspaceId],
  });

  res.json({
    msg: "User added successfully",
    workspace: updatedWorkspace,
    memberAdded,
  });
};
