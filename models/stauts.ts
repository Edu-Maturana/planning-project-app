import { DataTypes } from "sequelize";
import connection from "../db/connection";

const Status = connection.define("status", {
    name: {
        type: DataTypes.STRING,
    },
});

export default Status;