"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Status = connection_1.default.define("status", {
    name: {
        type: sequelize_1.DataTypes.STRING,
    },
});
exports.default = Status;
//# sourceMappingURL=stauts.js.map