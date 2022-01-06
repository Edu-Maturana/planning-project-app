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
const bcrypt = require("bcrypt");
const user_1 = __importDefault(require("../models/user"));
const generateJWT_1 = __importDefault(require("../helpers/generateJWT"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ message: "Missing parameters" });
    }
    const user = yield user_1.default.findOne({ where: { email } });
    if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
    }
    const isPasswordValid = yield bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        res.status(401).json({ message: "Invalid password" });
    }
    const token = (0, generateJWT_1.default)(user.id);
    const data = {
        id: user.id,
        name: user.name,
        email: user.email,
        token,
    };
    res.json({
        data
    });
});
exports.default = login;
//# sourceMappingURL=auth.js.map