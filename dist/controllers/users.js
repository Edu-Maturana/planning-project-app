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
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUser = exports.getUsers = void 0;
const uuid_1 = require("uuid");
const user_1 = __importDefault(require("../models/user"));
const bcrypt = require("bcrypt");
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_1.default.findAll({
        attributes: {
            exclude: ["password", "createdAt", "updatedAt"],
        },
    });
    res.json(users);
});
exports.getUsers = getUsers;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const user = yield user_1.default.findByPk(id, {
        attributes: {
            exclude: ["password", "createdAt", "updatedAt"],
        },
    });
    if (!user) {
        res.status(404).json({ message: "User not found" });
    }
    res.json(user);
});
exports.getUser = getUser;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
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
const updateUser = (req, res) => {
    // const id = req.params.id;
    // TODO Verify if user is the same that is trying to update
};
exports.updateUser = updateUser;
const deleteUser = (req, res) => {
    const id = req.params.id;
    res.json({
        msg: `Delete user ${id}`,
        user: id,
    });
};
exports.deleteUser = deleteUser;
//# sourceMappingURL=users.js.map