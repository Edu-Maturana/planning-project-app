import { DataTypes, Model } from "sequelize";

import connection from "../db/connection";

// Create workspace model
class Workspace extends Model {
  public id!: string;
  public name!: string;
  public description!: string;
  public owner!: string;
  public members!: String[];
  public createdAt!: Date;
}

Workspace.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    owner: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "user",
        key: "id",
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    members: {
      type: DataTypes.JSON,
      defaultValue: [],
      allowNull: false,
      references: {
        model: "user",
        key: "id",
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize: connection,
    modelName: "workspace",
  }
);

export default Workspace;
