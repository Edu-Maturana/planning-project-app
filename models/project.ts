import { DataTypes, Model } from "sequelize";
import moment from "moment";

import connection from "../db/connection";

class Project extends Model {
    public id!: number;
    public name!: string;
    public workspace!: number;
    public description!: string;
    public owner!: string;
    public createdAt!: Date;
}

Project.init({
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    workspace: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: "workspace",
            key: "id",
        },
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    owner: {
        type: DataTypes.STRING,
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
    modelName: "project",
});


export default Project;