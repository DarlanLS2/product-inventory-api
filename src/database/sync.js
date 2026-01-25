import { sequelize } from './sequelize.js';
import { Product }from './models/productModel.js';
import { User } from './models/userModel.js'

export async function syncDatabase(retries = 10) {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    console.log("Banco conectado e sincronizado");
  } catch (err) {
    console.log("Banco não pronto, tentando novamente...");
    if (retries === 0) throw err;
    await new Promise(resolve => setTimeout(resolve, 3000));
    return syncDatabase(sequelize, retries - 1);
  }
}
