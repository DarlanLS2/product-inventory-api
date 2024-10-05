// Obtém o cliente
import mysql from 'mysql2/promise';

// Cria a conexão com o Banco de Dados
const conexao = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'carros',
});

// INSERT exemplo:
try {
  const [results, fields] = await conexao.query(
    'INSERT INTO carros (marca, modelo) VALUES ("ferrari", "X8");'
  );
  console.log(results); // "results" contêm as linhas retornadas pelo servidor
  console.log(fields); // "fields" contêm metadados adicionais sobre os resultados, quando disponíveis
} catch (err) {
  console.log(err);
}
// Consulta simples
try {
  const [results, fields] = await conexao.query(
    'SELECT * FROM carros'
  );

  console.log(results); // "results" contêm as linhas retornadas pelo servidor
  console.log(fields); // "fields" contêm metadados adicionais sobre os resultados, quando disponíveis
} catch (err) {
  console.log(err);
}
 


