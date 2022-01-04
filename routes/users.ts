import { Router } from "express";
import { check } from "express-validator";

import {
  getUsers,
  getUser,
  createUser,
  deleteUser,
} from "../controllers/users";
import validateFields from "../middlewares/validateFields";

const router = Router();

router.get("/", getUsers);
router.get("/:id", getUser);

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
router.delete("/:id", deleteUser);

export default router;
