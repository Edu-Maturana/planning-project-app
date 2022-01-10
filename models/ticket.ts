import { DataTypes, DATE, Model } from "sequelize";

import connection from "../db/connection";

class Ticket extends Model {
    public id!: string;
    public title!: string;
    public description!: string;
    public priority!: number;
    public project!: string;
    public workspace!: string;
    public assignee!: string[];
    public files!: string[];
    public status!: number;
    public createdAt!: Date;
    public updatedAt!: Date;
}

// Create ticket model
Ticket.init({
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    project: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: "project",
            key: "id",
        },
    },
    workspace: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: "workspace",
            key: "id",
        },
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "status",
            key: "id",
        },
        defaultValue: 1,
    },
    priority: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "priority",
            key: "id",
        },
        defaultValue: 1,
    },
    creator : {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: "user",
            key: "id",
        },
    },
    assignee: {
        type: DataTypes.JSON,
        allowNull: true,
        references: {
            model: "user",
            key: "id",
        },
        defaultValue: [],
    },
    files: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: [],
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, {
    sequelize: connection,
    modelName: "ticket",
});

export default Ticket;