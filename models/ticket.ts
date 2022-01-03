import { DataTypes, Model } from "sequelize";

import connection from "../db/connection";

class Ticket extends Model {
    public id!: string;
    public title!: string;
    public description!: string;
    public priority!: string;
    public project!: string;
    public assignee!: string[];
    public status!: string;
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
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: "status",
            key: "id",
        },
    },
    priority: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: "priority",
            key: "id",
        },
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
        type: DataTypes.ARRAY(DataTypes.STRING),
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
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, {
    sequelize: connection,
    modelName: "ticket",
});

export default Ticket;