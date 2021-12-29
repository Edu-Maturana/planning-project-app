import { Request, Response } from "express";

export const getUsers = (req: Request, res: Response) => {
  res.json({
    msg: "Get users",
  });
};

export const getUser = (req: Request, res: Response) => {
  const id = req.params.id;
  res.json({
    msg: `Get user ${id}`,
  });
};

export const createUser = (req: Request, res: Response) => {
  res.json({
    msg: "Create user",
  });
};

export const updateUser = (req: Request, res: Response) => {
  const id = req.params.id;
  res.json({
    msg: `Update user ${id}`,
  });
};

export const deleteUser = (req: Request, res: Response) => {
  const id = req.params.id;
  res.json({
    msg: `Delete user ${id}`,
    user: id,
  });
};
