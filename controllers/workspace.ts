import { Response } from "express";
import { v4 as uuidv4 } from "uuid";

import Workspace from "../models/workspace";
import User from "../models/user";

export const createWorkspace = async (req: any, res: Response) => {
  const { name, description } = req.body;

  const owner = req.user.id;

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

  res.json(workspace);
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

    res.json({
        msg: "User added successfully",
        workspace: updatedWorkspace,
    });
};