"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Workspace = connection_1.default.define("workspace", {
    name: {
        type: sequelize_1.DataTypes.STRING,
    },
    owner: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    users: {
        type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.INTEGER),
    },
    projects: {
        type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.INTEGER),
    },
});
//# sourceMappingURL=workspace.js.map