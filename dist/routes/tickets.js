"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const ticket_1 = require("../controllers/ticket");
const validateFields_1 = __importDefault(require("../middlewares/validateFields"));
const validateJWT_1 = __importDefault(require("../middlewares/validateJWT"));
const router = (0, express_1.Router)();
router.post("/:id", [
    validateJWT_1.default,
    (0, express_validator_1.check)("title", "Title is required").not().isEmpty(),
    (0, express_validator_1.check)("description", "Description is required").not().isEmpty(),
    validateFields_1.default,
], ticket_1.createTicket);
router.put("/upload/:id", validateJWT_1.default, ticket_1.uploadFile);
exports.default = router;
//# sourceMappingURL=tickets.js.map