"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config"));
const database = config_1.default.name;
const user = config_1.default.user;
const password = config_1.default.password;
const host = config_1.default.host;
const connection = new sequelize_1.Sequelize(database, user, password, {
    host,
    dialect: "mysql",
});
exports.default = connection;
//# sourceMappingURL=connection.js.map