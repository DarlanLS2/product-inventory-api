import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("loja", "root", "", {
  host: "localhost",
  dialect: "mysql",
});
