"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
// Create status model
class Status extends sequelize_1.Model {
}
Status.init({
    id: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: connection_1.default,
    modelName: "status",
});
exports.default = Status;
//# sourceMappingURL=stauts.js.map