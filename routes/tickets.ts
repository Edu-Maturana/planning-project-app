import { Router } from "express";
import { check } from "express-validator";

import { createTicket, updateTicket, uploadFile } from "../controllers/ticket";
import validateFields from "../middlewares/validateFields";
import validateJWT from "../middlewares/validateJWT";

const router = Router();

router.post(
  "/:id",
  [
    validateJWT,
    check("title", "Title is required").not().isEmpty(),
    check("description", "Description is required").not().isEmpty(),
    validateFields,
  ],
  createTicket
);

router.put("/upload/:id", validateJWT, uploadFile);

export default router;
