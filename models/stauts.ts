import { DataTypes, Model } from "sequelize";

import connection from "../db/connection";

// Create status model
class Status extends Model {
    public id!: number;
    public name!: string;
}

Status.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        defaultValue: 1,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Backlog",
    },
}, {
    sequelize: connection,
    modelName: "status",
});

export default Status;