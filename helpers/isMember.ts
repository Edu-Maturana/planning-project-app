import { Response } from "express";

import Project from "../models/project";
import Workspace from "../models/workspace";

// Verify if user is member of the workspace

export const isMember = async (req: any, res: Response, next: any) => {
  const user = req.user.id;
  const project = req.params.id;

  const projectExists = await Project.findByPk(project);
  if (!projectExists) {
    return res.status(404).json({
      message: "Project not found",
    });
  }

  const workspace = projectExists.workspace;
  const workspaceUsers = await Workspace.findByPk(workspace);

  if (!workspaceUsers.members.includes(user)) {
    return res.status(403).json({
      message: "Permission denied",
    });
  }

  next();
};
