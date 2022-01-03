"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
class Project extends sequelize_1.Model {
}
Project.init({
    id: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    workspace: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        references: {
            model: "workspace",
            key: "id",
        },
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    owner: {
        type: sequelize_1.DataTypes.STRING,
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
}, {
    sequelize: connection_1.default,
    modelName: "project",
});
exports.default = Project;
//# sourceMappingURL=project.js.map