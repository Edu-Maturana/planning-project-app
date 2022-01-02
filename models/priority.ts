import { DataTypes } from "sequelize";
import connection from "../db/connection";

const Priority = connection.define("priority", {
    name: {
        type: DataTypes.STRING,
    },
});

export default Priority;