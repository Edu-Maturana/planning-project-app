import { Router } from "express";
import { check } from "express-validator";

import { createWorkspace, addMember } from "../controllers/workspace";
import validateFields from "../middlewares/validateFields";
import validateJWT from "../middlewares/validateJWT";

const router = Router();

router.post(
  "/",
  [
    validateJWT,
    check("name", "Name is required").not().isEmpty(),
    check("description", "Description is required").not().isEmpty(),
    validateFields,
  ],
  createWorkspace
);

router.put(
  "/:id",
  [
    validateJWT,
    check("userId", "User id is required").not().isEmpty(),
    validateFields,
  ],
  addMember
);

export default router;
