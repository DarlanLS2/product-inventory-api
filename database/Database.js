import {Sequelize, DataTypes} from "sequelize";

export class Database {
  constructor() {
    this.sequelize = new Sequelize("loja", "root", "", {
      host: "localhost",
      dialect: "mysql",
    });
  }
  
  async showLogMessage() {
    if (await this.isConected()) {
      console.log("------------------------")
      console.log('Conexão com banco: Ok');
    } else {
      console.error('Conexão com banco: Error');
    }
  }

  async isConected() {
    try {
      await this.sequelize.authenticate()
      return true;
    } catch (err) {
      return false;
    }
  }

  defineModels() {
    const Product = this.sequelize.define( "produto", {
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
    return {Product};
  }
  syncTables() {
    Product.sync({ force: true });
  }
}

