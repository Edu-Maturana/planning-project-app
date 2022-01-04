import { DataTypes, Model } from "sequelize";

import connection from "../db/connection";

class Project extends Model {
    public id!: number;
    public name!: string;
    public workspace!: string;
    public description!: string;
    public createdBy!: string;
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
    createdBy: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: "user",
            key: "id",
        },
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, {
    sequelize: connection,
    modelName: "project",
});


export default Project;