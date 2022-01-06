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
exports.addMember = exports.createWorkspace = void 0;
const uuid_1 = require("uuid");
const workspace_1 = __importDefault(require("../models/workspace"));
const user_1 = __importDefault(require("../models/user"));
const createWorkspace = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description } = req.body;
    const owner = req.user.id;
    if (!owner) {
        return res.status(401).json({
            msg: "There is no user logged in",
        });
    }
    const workspace = yield workspace_1.default.create({
        id: (0, uuid_1.v4)(),
        name,
        description,
        owner,
        members: [owner],
    });
    res.json(workspace);
});
exports.createWorkspace = createWorkspace;
const addMember = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.body;
    const workspaceId = req.params.id;
    const workspace = yield workspace_1.default.findByPk(workspaceId);
    if (!workspace) {
        return res.status(404).json({
            msg: "Workspace not found",
        });
    }
    if (workspace.owner !== req.user.id) {
        return res.status(401).json({
            msg: "You are not the owner of this workspace",
        });
    }
    const user = yield user_1.default.findByPk(userId);
    if (!user) {
        return res.status(404).json({
            msg: "User not found",
        });
    }
    if (workspace.members.includes(userId)) {
        return res.status(400).json({
            msg: "User is already a member of this workspace",
        });
    }
    const updatedWorkspace = yield workspace.update({
        members: [...workspace.members, userId],
    });
    res.json({
        msg: "User added successfully",
        workspace: updatedWorkspace,
    });
});
exports.addMember = addMember;
//# sourceMappingURL=workspace.js.map