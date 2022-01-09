import { Response } from "express";
import { v4 as uuidv4 } from "uuid";
import envVars from "../config";
const cloudinary = require("cloudinary").v2;

import Ticket from "../models/ticket";

cloudinary.config(envVars.CLOUDINARY_URL);
const validExtensions = ["jpg", "png", "jpeg"];

export const uploadFileToTicket = async (req: any, res: Response) => {
  const { id } = req.params;
  const file = req.files.file;

  // Check if ticket exists
  const ticketExists = await Ticket.findByPk(id);
  if (!ticketExists) {
    return res.status(404).json({
      message: "Ticket not found",
    });
  }

  // Check if file extension is valid
  const fileExtension = file.name.split(".").pop();
  if (!validExtensions.includes(fileExtension)) {
    return res.status(400).json({
      message: "Invalid file extension",
    });
  }

  // Upload file to cloudinary
  const { secure_url } = await cloudinary.uploader.upload(file.tempFilePath);

  // Update ticket
  await Ticket.update(
    {
      files: [...ticketExists.files, secure_url],
    },
    {
      where: {
        id,
      },
    }
  );

  return res.status(200).json({
    message: "File uploaded successfully",
    image: secure_url,
  });
};

export const deleteFileFromTicket = async (req: any, res: Response) => {
  const { id } = req.params;
  const { file } = req.body;

  // Check if ticket exists
  const ticketExists = await Ticket.findByPk(id);
  if (!ticketExists) {
    return res.status(404).json({
      message: "Ticket not found",
    });
  }

  // Delete file from cloudinary
  file.split("/").pop();
  await cloudinary.uploader.destroy(file);

  // Update ticket
  await Ticket.update(
    {
      files: ticketExists.files.filter((file: File) => file !== file),
    },
    {
      where: {
        id,
      },
    }
  );

  return res.status(200).json({
    message: "File deleted successfully",
  });
}
