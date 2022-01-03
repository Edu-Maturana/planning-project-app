import { DataTypes, Model } from "sequelize";
import moment from "moment";

import connection from "../db/connection";

// Create workspace model
class Workspace extends Model {
    public id!: number;
    public name!: string;
    public description!: string;
    public members!: String[];
    public createdAt!: Date;
}

Workspace.init({
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    members: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        references: {
            model: "user",
            key: "id",
        },
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: moment().format("DD-MM-YYYY"),
        allowNull: false,
    },
}, {
    sequelize: connection,
    modelName: "workspace",
});

export default Workspace;


