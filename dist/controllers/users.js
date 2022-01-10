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
exports.deleteUser = exports.createUser = exports.getTeammate = exports.getTeammates = void 0;
const uuid_1 = require("uuid");
const bcrypt = require("bcrypt");
const user_1 = __importDefault(require("../models/user"));
const workspace_1 = __importDefault(require("../models/workspace"));
const getTeammates = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.user;
    const user = yield user_1.default.findByPk(id);
    if (!user) {
        return res.status(404).json({
            msg: "User not found",
        });
    }
    const membership = user.isMember[0];
    const workspace = yield workspace_1.default.findByPk(membership);
    if (!workspace) {
        return res.status(404).json({
            msg: "Workspace not found",
        });
    }
    const teammates = workspace.members;
    // filter out the current user
    const filteredTeammates = teammates.filter((teammate) => {
        return teammate !== id;
    });
    res.json({
        teammates: filteredTeammates,
    });
});
exports.getTeammates = getTeammates;
const getTeammate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = req.user.id;
    // verify that the user exists and is a teammate of the current user
    const teammate = yield user_1.default.findByPk(id);
    if (!teammate) {
        return res.status(404).json({
            msg: "User not found",
        });
    }
    const currentUser = yield user_1.default.findByPk(user);
    if (currentUser.isMember[0] == teammate.isMember[0]) {
        return res.status(200).json({
            teammate,
        });
    }
    return res.status(401).json({
        msg: "You are not a teammate of this user",
    });
});
exports.getTeammate = getTeammate;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    // Check if user exists
    const userExists = yield user_1.default.findOne({
        where: {
            email,
        },
    });
    if (userExists) {
        return res.status(409).json({
            msg: "User already exists",
        });
    }
    // Encrypt password
    const encrypted = yield bcrypt.hash(password, 10);
    let user = yield user_1.default.create({
        id: (0, uuid_1.v4)(),
        name,
        email,
        password: encrypted,
    });
    const { id, name: userName, email: userEmail } = user;
    res.json({
        msg: "User signed up successfully!",
        user: {
            id,
            name: userName,
            email: userEmail,
        },
    });
});
exports.createUser = createUser;
const deleteUser = (req, res) => {
    const id = req.params.id;
    res.json({
        msg: `Delete user ${id}`,
        user: id,
    });
};
exports.deleteUser = deleteUser;
//# sourceMappingURL=users.js.map