"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isMemberTicket = exports.isMemberProject = exports.isMemberWorkspace = void 0;
const project_1 = __importDefault(require("../models/project"));
const workspace_1 = __importDefault(require("../models/workspace"));
const ticket_1 = __importDefault(require("../models/ticket"));
const isMemberWorkspace = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const workspace = req.params.id;
    // Check if workspace exists
    const workspaceExists = yield workspace_1.default.findByPk(workspace);
    if (!workspaceExists) {
        return res.status(404).json({
            message: "Workspace not found",
        });
    }
    // Check if user is member of workspace
    const user = req.user.id;
    const isMember = workspaceExists.members.includes(user);
    if (!isMember) {
        return res.status(401).json({
            message: "You are not member of this workspace",
        });
    }
    next();
});
exports.isMemberWorkspace = isMemberWorkspace;
const isMemberProject = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user.id;
    const project = req.params.id;
    const projectExists = yield project_1.default.findByPk(project);
    if (!projectExists) {
        return res.status(404).json({
            message: "Project not found",
        });
    }
    const workspace = projectExists.workspace;
    const workspaceExists = yield workspace_1.default.findByPk(workspace);
    if (!workspaceExists) {
        return res.status(404).json({
            message: "Workspace not found",
        });
    }
    const members = workspaceExists.members;
    const isMember = members.find((member) => member.id === user);
    if (!isMember) {
        return res.status(401).json({
            message: "You are not authorized to access this resource",
        });
    }
    next();
});
exports.isMemberProject = isMemberProject;
const isMemberTicket = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user.id;
    const ticket = req.params.id;
    const ticketExists = yield ticket_1.default.findByPk(ticket);
    if (!ticketExists) {
        return res.status(404).json({
            message: "Ticket not found",
        });
    }
    const workspace = ticketExists.workspace;
    const workspaceExists = yield workspace_1.default.findByPk(workspace);
    if (!workspaceExists) {
        return res.status(404).json({
            message: "Workspace not found",
        });
    }
    const members = workspaceExists.members;
    const isMember = members.find((member) => member.id === user);
    if (!isMember) {
        return res.status(401).json({
            message: "You are not authorized to access this resource",
        });
    }
    next();
});
exports.isMemberTicket = isMemberTicket;
//# sourceMappingURL=isMember.js.map