import { Response } from "express";

import Project from "../models/project";
import Workspace from "../models/workspace";
import Ticket from "../models/ticket";

export const isMemberWorkspace = async (req: any, res: Response, next: any) => {
  const workspace = req.params.id;

  // Check if workspace exists
  const workspaceExists = await Workspace.findByPk(workspace);

  if (!workspaceExists) {
    return res.status(404).json({
      message: "Workspace not found",
    });
  }

  // Check if user is member of workspace

  const user = req.user.id;

  const isMember = workspaceExists.members.includes(user);

  if (!isMember) {
    return res.status(401).json({
      message: "You are not member of this workspace",
    });
  }

  next();
};

export const isMemberProject = async (req: any, res: Response, next: any) => {
  const user = req.user.id;

  const project = req.params.id;

  const projectExists = await Project.findByPk(project);

  if (!projectExists) {
    return res.status(404).json({
      message: "Project not found",
    });
  }

  const workspace = projectExists.workspace;

  const workspaceExists = await Workspace.findByPk(workspace);

  if (!workspaceExists) {
    return res.status(404).json({
      message: "Workspace not found",
    });
  }

  const members = workspaceExists.members;

  const isMember = members.includes(user);

  if (!isMember) {
    return res.status(401).json({
      message: "Permission denied",
    });
  }

  next();
};

export const isMemberTicket = async (req: any, res: Response, next: any) => {
  const user = req.user.id;

  const ticket = req.params.id;

  const ticketExists = await Ticket.findByPk(ticket);

  if (!ticketExists) {
    return res.status(404).json({
      message: "Ticket not found",
    });
  }

  const workspace = ticketExists.workspace;

  const workspaceExists = await Workspace.findByPk(workspace);

  if (!workspaceExists) {
    return res.status(404).json({
      message: "Workspace not found",
    });
  }

  const members = workspaceExists.members;

  const isMember = members.find((member: any) => member.id === user);

  if (!isMember) {
    return res.status(401).json({
      message: "Permission denied",
    });
  }

  next();
};
