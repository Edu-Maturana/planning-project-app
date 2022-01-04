import { Response } from "express";
import { v4 as uuidv4 } from "uuid";

import Ticket from "../models/ticket";
import Project from "../models/project";
import Workspace from "../models/workspace";
import uploadToS3 from "../helpers/uploadToS3";

const validExtensions = ["jpg", "png", "jpeg"];

export const createTicket = async (req: any, res: Response) => {
  const { title, description } = req.body;
  const project = req.params.id;

  // Check if project exists
  const projectExists = await Project.findByPk(project);
  if (!projectExists) {
    return res.status(404).json({
      message: "Project not found",
    });
  }

  // Verify if user is allowed to create ticket in the workspace
  const user = req.user.id;
  const workspace = projectExists.workspace;
  const workspaceUsers = await Workspace.findByPk(workspace);

  if (!workspaceUsers.members.includes(user)) {
    return res.status(403).json({
      message: "Permission denied",
    });
  }

  // Create ticket
  const ticket = await Ticket.create({
    id: uuidv4(),
    title,
    description,
    project,
    creator: user,
  });

  return res.status(201).json({
    message: "Ticket created successfully",
    ticket,
  });
};

export const updateTicket = async (req: any, res: Response) => {
  const { title, description } = req.body;
  const ticket = req.params.id;

  // Check if ticket exists
  const ticketExists = await Ticket.findByPk(ticket);
  if (!ticketExists) {
    return res.status(404).json({
      message: "Ticket not found",
    });
  }

  // Verify if user is allowed to update ticket in the workspace
  const user = req.user.id;
  const project = ticketExists.project;
  const projectExists = await Project.findByPk(project);
  const workspace = projectExists.workspace;
  const workspaceUsers = await Workspace.findByPk(workspace);

  if (!workspaceUsers.members.includes(user)) {
    return res.status(403).json({
      message: "Permission denied",
    });
  }

  // Update ticket
  await Ticket.update(
    {
      title,
      description,
    },
    {
      where: {
        id: ticket,
      },
    }
  );

  return res.status(200).json({
    message: "Ticket updated successfully",
  });
};

const changeStatus = async (req: any, res: Response) => {
  const { status } = req.body;
  const ticket = req.params.id;

  // Check if ticket exists
  const ticketExists = await Ticket.findByPk(ticket);
  if (!ticketExists) {
    return res.status(404).json({
      message: "Ticket not found",
    });
  }

  // Verify if user is allowed to update ticket in the workspace
  const user = req.user.id;
  const project = ticketExists.project;
  const projectExists = await Project.findByPk(project);

  const workspace = projectExists.workspace;
  const workspaceUsers = await Workspace.findByPk(workspace);

  if (!workspaceUsers.members.includes(user)) {
    return res.status(403).json({
      message: "Permission denied",
    });
  }

  // Update ticket
  await Ticket.update(
    {
      status,
    },
    {
      where: {
        id: ticket,
      },
    }
  );

  return res.status(200).json({
    message: "Ticket updated successfully",
  });
};

export const uploadFile = async (req: any, res: Response) => {
  const ticket = req.params.id;

  // Check if there are files
  if (!req.files) {
    return res.status(400).json({
      message: "No files were uploaded.",
    });
  }

  // Check if ticket exists
  const ticketExists = await Ticket.findByPk(ticket);
  if (!ticketExists) {
    return res.status(404).json({
      message: "Ticket not found",
    });
  }

  const file = req.files.file;
  const fileName = file.name;
  const fileExtension = fileName.split(".").pop();

  if (!validExtensions.includes(fileExtension)) {
    return res.status(400).json({
      message: "Invalid file extension",
    });
  }

  // Upload file to S3
  const fileUrl = uploadToS3(file);

  // Add file to ticket
  await Ticket.update(
    {
      files: [...ticketExists.files, fileUrl],
    },
    {
      where: {
        id: ticket,
      },
    }
  );

  return res.status(200).json({
    message: "File uploaded successfully",
  });
};
