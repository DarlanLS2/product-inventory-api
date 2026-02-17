import { DataTypes } from "sequelize";
import { sequelize } from "../sequelize.js";

export const User = sequelize.define("user", {
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  passWordHash: {
    type: DataTypes.STRING,
    allowNull: false
  }
});
