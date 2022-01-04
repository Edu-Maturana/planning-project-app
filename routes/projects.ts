import { Router } from "express";
import { check } from "express-validator";

import { createProject, deleteProject } from "../controllers/project";
import validateFields from "../middlewares/validateFields";
import validateJWT from "../middlewares/validateJWT";

const router = Router();

router.post(
  "/:id",
  [
    validateJWT,
    check("name", "Name is required").not().isEmpty(),
    check("description", "Description is required").not().isEmpty(),
    validateFields,
  ],
  createProject
);

router.delete("/:id", validateJWT, deleteProject);

export default router;
