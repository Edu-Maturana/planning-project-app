import { DataTypes } from "sequelize";
import connection from "../db/connection";

const User = connection.define("user", {
    name: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
    },
    status : {
        type: DataTypes.BOOLEAN,
    },
});

export default User;