"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const ticket_1 = require("../controllers/ticket");
const upload_1 = require("../controllers/upload");
const isMember_1 = require("../helpers/isMember");
const validateFields_1 = __importDefault(require("../middlewares/validateFields"));
const validateJWT_1 = __importDefault(require("../middlewares/validateJWT"));
const router = (0, express_1.Router)();
router.post("/:id", [
    validateJWT_1.default,
    isMember_1.isMemberProject,
    (0, express_validator_1.check)("title", "Title is required").not().isEmpty(),
    (0, express_validator_1.check)("description", "Description is required").not().isEmpty(),
    validateFields_1.default,
], ticket_1.createTicket);
router.put("/:id", [
    validateJWT_1.default,
    isMember_1.isMemberTicket,
    (0, express_validator_1.check)("title", "Title is required").not().isEmpty(),
    (0, express_validator_1.check)("description", "Description is required").not().isEmpty(),
    validateFields_1.default,
], ticket_1.updateTicket);
router.put("/files/:id", [validateJWT_1.default, isMember_1.isMemberTicket, validateFields_1.default], upload_1.uploadFileToTicket);
router.delete("/files/:id", [validateJWT_1.default, isMember_1.isMemberTicket], upload_1.deleteFileFromTicket);
router.delete("/:id", [validateJWT_1.default, isMember_1.isMemberTicket], ticket_1.deleteTicket);
exports.default = router;
//# sourceMappingURL=tickets.js.map