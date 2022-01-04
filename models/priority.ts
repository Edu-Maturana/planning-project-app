import { DataTypes, Model } from "sequelize";

import connection from "../db/connection";

class Priority extends Model {
    public id!: number;
    public level!: string;
    public color!: string;
}

Priority.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        defaultValue: 1,
    },
    level: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Low",
    },
    color: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "green",
    },
}, {
    sequelize: connection,
    modelName: "priority",
});

export default Priority;