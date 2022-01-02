import { DataTypes } from "sequelize";
import connection from "../db/connection";

const Project = connection.define("project", {
    name: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.STRING,
    },
});

export default Project;