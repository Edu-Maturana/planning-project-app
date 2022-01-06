import { Router } from "express";
import { check } from "express-validator";

import { createProject, deleteProject } from "../controllers/project";
import { isMemberProject, isMemberWorkspace } from "../helpers/isMember";
import validateFields from "../middlewares/validateFields";
import validateJWT from "../middlewares/validateJWT";

const router = Router();

router.post(
  "/:id",
  [
    validateJWT,
    isMemberWorkspace,
    check("name", "Name is required").not().isEmpty(),
    check("description", "Description is required").not().isEmpty(),
    validateFields,
  ],
  createProject
);

router.delete(
  "/:id",
  [validateJWT, isMemberProject, validateFields],
  deleteProject
);

export default router;
