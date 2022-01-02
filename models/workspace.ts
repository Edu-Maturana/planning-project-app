import { DataTypes } from "sequelize";
import connection from "../db/connection";

const Workspace = connection.define("workspace", {
    name: {
        type: DataTypes.STRING,
    },
    owner : {
        type: DataTypes.INTEGER,
    },
    users : {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
    },
    projects : {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
    },
});