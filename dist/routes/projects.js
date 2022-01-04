"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const project_1 = require("../controllers/project");
const validateFields_1 = __importDefault(require("../middlewares/validateFields"));
const validateJWT_1 = __importDefault(require("../middlewares/validateJWT"));
const router = (0, express_1.Router)();
router.post("/:id", [
    validateJWT_1.default,
    (0, express_validator_1.check)("name", "Name is required").not().isEmpty(),
    (0, express_validator_1.check)("description", "Description is required").not().isEmpty(),
    validateFields_1.default,
], project_1.createProject);
router.delete("/:id", validateJWT_1.default, project_1.deleteProject);
exports.default = router;
//# sourceMappingURL=projects.js.map