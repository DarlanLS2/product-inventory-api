import mysql from "mysql2";

// Cocexao com o banco de daddos
const conexao = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "loja"
});

// Verifica se a conexão com o bando deu certo
conexao.connect((err) => {
  if (err) {
    console.log("Erro ao tentar se conectar ao banco");
    return;
  };
  console.log("Conexao com o banco: ok");
});

// Exporta a conexao com o banco 
export default conexao;