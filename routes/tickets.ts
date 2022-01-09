import { Router } from "express";
import { check } from "express-validator";

import {
  changeStatus,
  changePriority,
  createTicket,
  updateTicket,
} from "../controllers/ticket";
import {
  deleteFileFromTicket,
  uploadFileToTicket,
} from "../controllers/upload";
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

export default router;
