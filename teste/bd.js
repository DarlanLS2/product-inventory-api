import mysql from "mysql2";

// Cria uma conexao com o banco de dados
const conexao = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "loja"
});

// Verifica se a conexao deu erro ou nao
conexao.connect((err) => {
  if (err) {
    console.log("Erro na conexão");
    return
  }
  console.log("conexão estabelecida");
  }
)

// Exporta a conexao
export default conexao;