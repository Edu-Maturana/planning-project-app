import { DataTypes, Model } from "sequelize";
import moment from "moment";

import connection from "../db/connection";

class User extends Model {
    public id!: number;
    public name!: string;
    public email!: string;
    public password!: string;
    public avatar!: string;
    public createdAt!: Date;
    public updatedAt!: Date;
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    avatar: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: moment().format("DD-MM-YYYY"),
        allowNull: false,
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: moment().format("DD-MM-YYYY"),
        allowNull: false,
    },
}, {
    sequelize: connection,
    modelName: "user",
});

export default User;