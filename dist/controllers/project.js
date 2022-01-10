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
exports.deleteProject = exports.createProject = exports.getProject = exports.getProjects = void 0;
const uuid_1 = require("uuid");
const project_1 = __importDefault(require("../models/project"));
const user_1 = __importDefault(require("../models/user"));
const workspace_1 = __importDefault(require("../models/workspace"));
const getProjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.user;
    const user = yield user_1.default.findByPk(id);
    if (!user) {
        return res.status(404).json({
            msg: "User not found",
        });
    }
    const projects = yield project_1.default.findAll({
        where: {
            workspace: user.isMember[0],
        },
    });
    if (!projects) {
        return res.status(404).json({
            msg: "You are not a member of any project",
        });
    }
    res.json({
        projects,
    });
});
exports.getProjects = getProjects;
const getProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const project = yield project_1.default.findByPk(id);
    if (!project) {
        return res.status(404).json({
            msg: "Project not found",
        });
    }
    res.json({
        project,
    });
});
exports.getProject = getProject;
const createProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description } = req.body;
    const workspace = req.params.id;
    const project = yield project_1.default.create({
        id: (0, uuid_1.v4)(),
        name,
        description,
        createdBy: req.user.id,
        workspace,
    });
    delete project.dataValues.updatedAt;
    res.json({
        msg: "Project created successfully",
        project,
    });
});
exports.createProject = createProject;
const deleteProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const project = yield project_1.default.findByPk(id);
    if (!project) {
        return res.status(404).json({
            msg: "Project not found",
        });
    }
    const workspace = yield workspace_1.default.findByPk(project.workspace);
    if (!workspace) {
        return res.status(404).json({
            msg: "Workspace not found",
        });
    }
    yield project.destroy();
    res.json({
        msg: "Project deleted successfully",
    });
});
exports.deleteProject = deleteProject;
//# sourceMappingURL=project.js.map