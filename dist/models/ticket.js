"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
class Ticket extends sequelize_1.Model {
}
// Create ticket model
Ticket.init({
    id: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    project: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        references: {
            model: "project",
            key: "id",
        },
    },
    status: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        references: {
            model: "status",
            key: "id",
        },
    },
    priority: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        references: {
            model: "priority",
            key: "id",
        },
    },
    creator: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        references: {
            model: "user",
            key: "id",
        },
    },
    assignee: {
        type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.STRING),
        allowNull: false,
        references: {
            model: "user",
            key: "id",
        },
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
}, {
    sequelize: connection_1.default,
    modelName: "ticket",
});
exports.default = Ticket;
//# sourceMappingURL=ticket.js.map