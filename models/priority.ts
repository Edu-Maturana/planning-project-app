import { DataTypes, Model } from "sequelize";

import connection from "../db/connection";

class Priority extends Model {
    public id!: string;
    public name!: string;
    public color!: string;
}

Priority.init({
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    color: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: connection,
    modelName: "priority",
});

export default Priority;