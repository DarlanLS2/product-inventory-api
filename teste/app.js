import express from "express";
import conexao from "./bd.js"; // Importa a conexao do sql

const app = express(); // Instancia do express
const port = 3000; // Porta padrão

// Permite que app trabalhe com arquivos json
app.use(express.json());

// Rota para pegar todos os produtos
app.get("/produto", (req, res) => {
  const query = "SELECT * FROM produto";
  // Executa uma query no server sql
  conexao.query(query, (err, resultado) => {
    // Retorna os dados em formato json
    res.json(resultado); 
  });
});

// Inicia o server e manda uma mensagem
app.listen(port, () => {
  console.log("server on pae");
})