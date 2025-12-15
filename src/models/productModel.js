import { DataTypes } from "sequelize";
import { sequelize } from "../database/sequelize.js"

export const Product = sequelize.define( "produto", {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  preco: {
    type: DataTypes.DECIMAL,
    allowNull: false
  },
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: false
  }
})
