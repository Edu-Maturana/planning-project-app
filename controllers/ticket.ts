import { Response } from "express";
import { v4 as uuidv4 } from "uuid";

import Ticket from "../models/ticket";
import Project from "../models/project";

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
    workspace: projectExists.workspace,
    creator: user,
  });

  return res.status(201).json({
    message: "Ticket created successfully",
    ticket,
  });
};

// update tickey by optional query params, title, description, status, priority
export const updateTicket = async (req: any, res: Response) => {
  const { title, description, status, priority } = req.body;
  const { id } = req.params;

  // Check if ticket exists
  const ticketExists = await Ticket.findByPk(id);
  if (!ticketExists) {
    return res.status(404).json({
      message: "Ticket not found",
    });
  }

  // Update ticket
  await Ticket.update(
    {
      title: title || ticketExists.title,
      description: description || ticketExists.description,
      status: status || ticketExists.status,
      priority: priority || ticketExists.priority,
    },
    {
      where: {
        id,
      },
    }
  );

  return res.status(200).json({
    message: "Ticket updated successfully",
    ticket: ticketExists,
  });
};

export const deleteTicket = async (req: any, res: Response) => {
  const { id } = req.params;

  // Check if ticket exists
  const ticketExists = await Ticket.findByPk(id);
  if (!ticketExists) {
    return res.status(404).json({
      message: "Ticket not found",
    });
  }

  // Delete ticket
  await Ticket.destroy({
    where: {
      id,
    },
  });

  return res.status(200).json({
    message: "Ticket deleted successfully",
  });
};
