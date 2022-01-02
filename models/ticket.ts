import { DataTypes } from "sequelize";
import connection from "../db/connection";

const Ticket = connection.define("ticket", {
    title: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.STRING,
    },
    status: {
        type: DataTypes.STRING,
    },
    priority: {
        type: DataTypes.STRING,
    },
    projectId: {
        type: DataTypes.INTEGER,
    },
    creatorId: {
        type: DataTypes.INTEGER,
    },
    assigneeId: {
        type: DataTypes.INTEGER,
    },
    files: {
        type: DataTypes.ARRAY(DataTypes.STRING),
    },
});

export default Ticket;