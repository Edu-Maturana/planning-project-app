import { DataTypes, Model } from "sequelize";

import connection from "../db/connection";

class User extends Model {
    public id!: string;
    public name!: string;
    public email!: string;
    public password!: string;
    public isMember!: string[];
    public createdAt!: Date;
    public updatedAt!: Date;
}

User.init({
    id: {
        type: DataTypes.STRING,
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
    isMember: {
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
    modelName: "user",
});

export default User;