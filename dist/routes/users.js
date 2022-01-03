"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const users_1 = require("../controllers/users");
const validateFields_1 = __importDefault(require("../middlewares/validateFields"));
const router = (0, express_1.Router)();
router.get("/", users_1.getUsers);
router.get("/:id", users_1.getUser);
router.post("/", [
    (0, express_validator_1.check)("name", "Name is required").not().isEmpty(),
    (0, express_validator_1.check)("email", "Email is required").isEmail(),
    (0, express_validator_1.check)("password", "Password is required").not().isEmpty(),
    (0, express_validator_1.check)("password", "Password must have at least 8 characters").isLength({
        min: 8,
    }),
    validateFields_1.default
], users_1.createUser);
router.put("/:id", users_1.updateUser);
router.delete("/:id", users_1.deleteUser);
exports.default = router;
//# sourceMappingURL=users.js.map