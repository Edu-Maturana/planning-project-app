"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const workspace_1 = require("../controllers/workspace");
const validateFields_1 = __importDefault(require("../middlewares/validateFields"));
const validateJWT_1 = __importDefault(require("../middlewares/validateJWT"));
const router = (0, express_1.Router)();
router.post("/", [
    validateJWT_1.default,
    (0, express_validator_1.check)("name", "Name is required").not().isEmpty(),
    (0, express_validator_1.check)("description", "Description is required").not().isEmpty(),
    validateFields_1.default,
], workspace_1.createWorkspace);
router.put("/:id", [
    validateJWT_1.default,
    (0, express_validator_1.check)("userId", "User id is required").not().isEmpty(),
    validateFields_1.default,
], workspace_1.addMember);
exports.default = router;
//# sourceMappingURL=workspaces.js.map