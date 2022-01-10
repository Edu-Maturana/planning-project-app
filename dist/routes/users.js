"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const users_1 = require("../controllers/users");
const validateFields_1 = __importDefault(require("../middlewares/validateFields"));
const validateJWT_1 = __importDefault(require("../middlewares/validateJWT"));
const router = (0, express_1.Router)();
router.get("/", [
    validateJWT_1.default,
    validateFields_1.default,
], users_1.getTeammates);
router.get("/:id", [
    validateJWT_1.default,
    validateFields_1.default,
], users_1.getTeammate);
router.post("/", [
    (0, express_validator_1.check)("name", "Name is required").not().isEmpty(),
    (0, express_validator_1.check)("email", "Email is not valid").isEmail(),
    (0, express_validator_1.check)("password", "Password is required").not().isEmpty(),
    (0, express_validator_1.check)("password", "Password must have at least 8 characters").isLength({
        min: 8,
    }),
    validateFields_1.default,
], users_1.createUser);
router.delete("/:id", users_1.deleteUser);
exports.default = router;
//# sourceMappingURL=users.js.map