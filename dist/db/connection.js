"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config"));
const database = config_1.default.DB_NAME;
const user = config_1.default.DB_USER;
const password = config_1.default.DB_PASS;
const host = config_1.default.DB_HOST;
const connection = new sequelize_1.Sequelize(database, user, password, {
    host,
    dialect: "mysql",
});
exports.default = connection;
//# sourceMappingURL=connection.js.map