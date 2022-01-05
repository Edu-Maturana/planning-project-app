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
  const user = req.user.id;

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

export const changeStatus = async (req: any, res: Response) => {
  const ticket = req.params.id;
  const { status } = req.body;

  // Check if ticket exists
  const ticketExists = await Ticket.findByPk(ticket);
  if (!ticketExists) {
    return res.status(404).json({
      message: "Ticket not found",
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
};

export const changePriority = async (req: any, res: Response) => {
  const ticket = req.params.id;
  const { priority } = req.body;

  // Check if ticket exists
  const ticketExists = await Ticket.findByPk(ticket);
  if (!ticketExists) {
    return res.status(404).json({
      message: "Ticket not found",
    });
  }

  // Update ticket
  await Ticket.update(
    {
      priority,
    },
    {
      where: {
        id: ticket,
      },
    }
  );
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
