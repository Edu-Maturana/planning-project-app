"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
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
exports.default = router;
//# sourceMappingURL=users.js.map