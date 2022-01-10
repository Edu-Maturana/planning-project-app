import { Router } from "express";
import { check } from "express-validator";

import {
  getTickets,
  getTicket,
  createTicket,
  updateTicket,
  deleteTicket,
} from "../controllers/ticket";
import {
  deleteFileFromTicket,
  uploadFileToTicket,
} from "../controllers/upload";
import { isMemberTicket, isMemberProject } from "../helpers/isMember";
import validateFields from "../middlewares/validateFields";
import validateJWT from "../middlewares/validateJWT";

const router = Router();

router.get(
  "/:id",
  validateJWT,
  isMemberProject,
  getTickets
);

router.get(
  "/ticket/:id",
  validateJWT,
  isMemberTicket,
  getTicket
);

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

router.put(
  "/:id",
  [
    validateJWT,
    isMemberTicket,
    validateFields,
  ],
  updateTicket
);

router.put(
  "/files/:id",
  [validateJWT, isMemberTicket, validateFields],
  uploadFileToTicket
);
router.delete(
  "/files/:id",
  [validateJWT, isMemberTicket],
  deleteFileFromTicket
);

router.delete(
  "/:id",
  [validateJWT, isMemberTicket],
  deleteTicket
)

export default router;
