import { Database } from "../database/Database.js";

const db = new Database();
const { Product } = db.defineModels();

db.showLogMessage();

/*
  * Atenção: Rode a função syncTables() apenas na 
  * primeira vez que esta rodando o projeto, pois
  * ela apaga a tabela(se existir uma)e cria uma nova. 
  */
// db.syncTables();

export { Product };
