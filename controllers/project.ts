import { Response } from "express";
import { v4 as uuidv4 } from "uuid";

import Project from "../models/project";
import Workspace from "../models/workspace";

export const createProject = async (req: any, res: Response) => {
  const { name, description } = req.body;
  const workspace = req.params.id;

  const project = await Project.create({
    id: uuidv4(),
    name,
    description,
    createdBy: req.user.id,
    workspace,
  });

  delete project.dataValues.updatedAt;

  res.json({
    msg: "Project created successfully",
    project,
  });
};

export const deleteProject = async (req: any, res: Response) => {
  const { id } = req.params;

  const project = await Project.findByPk(id);

  if (!project) {
    return res.status(404).json({
      msg: "Project not found",
    });
  }

  const workspace = await Workspace.findByPk(project.workspace);

  if (!workspace) {
    return res.status(404).json({
      msg: "Workspace not found",
    });
  }

  await project.destroy();

  res.json({
    msg: "Project deleted successfully",
  });
};
