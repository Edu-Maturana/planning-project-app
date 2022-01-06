import { Router } from "express";
import { check } from "express-validator";

import {
  changeStatus,
  changePriority,
  createTicket,
  updateTicket,
  uploadFile,
} from "../controllers/ticket";
import { isMemberTicket, isMemberProject } from "../helpers/isMember";
import validateFields from "../middlewares/validateFields";
import validateJWT from "../middlewares/validateJWT";

const router = Router();

router.post(
  "/:id",
  [
    validateJWT,
    isMemberProject,
    check("title", "Title is required").not().isEmpty(),
    check("description", "Description is required").not().isEmpty(),
    validateFields,
  ],
  createTicket
);

router.put("/upload/:id", [
  validateJWT,
  isMemberTicket,
], uploadFile);

router.put(
  "/:id",
  [
    validateJWT,
    isMemberTicket,
    check("title", "Title is required").not().isEmpty(),
    check("description", "Description is required").not().isEmpty(),
    validateFields,
  ],
  updateTicket
);

router.put(
  "/status/:id",
  [
    validateJWT,
    isMemberTicket,
    check("status", "Status is required").not().isEmpty(),
    check("status", "Status is invalid").isIn([1, 2, 3, 4]),
    validateFields,
  ],
  changeStatus
);

router.put(
  "/priority/:id",
  [
    validateJWT,
    isMemberTicket,
    check("priority", "Priority is required").not().isEmpty(),
    check("priority", "Priority is invalid").isIn([1, 2, 3]),
    validateFields,
  ],
  changePriority
);

export default router;
