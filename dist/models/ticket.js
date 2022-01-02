"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Ticket = connection_1.default.define("ticket", {
    title: {
        type: sequelize_1.DataTypes.STRING,
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
    },
    status: {
        type: sequelize_1.DataTypes.STRING,
    },
    priority: {
        type: sequelize_1.DataTypes.STRING,
    },
    projectId: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    creatorId: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    assigneeId: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    files: {
        type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.STRING),
    },
});
exports.default = Ticket;
//# sourceMappingURL=ticket.js.map