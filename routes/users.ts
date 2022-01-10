import { Router } from "express";
import { check } from "express-validator";

import {
  getTeammates,
  getTeammate,
} from "../controllers/users";
import validateFields from "../middlewares/validateFields";
import validateJWT from "../middlewares/validateJWT";

const router = Router();

router.get("/", [
  validateJWT,
  validateFields,
],getTeammates);

router.get("/:id", [
  validateJWT,
  validateFields,
], getTeammate);

export default router;
