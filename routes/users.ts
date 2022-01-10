import { Router } from "express";
import { check } from "express-validator";

import {
  getTeammates,
  getTeammate,
  createUser,
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

router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Email is not valid").isEmail(),
    check("password", "Password is required").not().isEmpty(),
    check("password", "Password must have at least 8 characters").isLength({
      min: 8,
    }),
    validateFields,
  ],
  createUser
);

export default router;
