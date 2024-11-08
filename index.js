import express from "express"; 
import {Produto} from "./banco_de_dados/conexao_com_sequelize.js" 
import path from "path"; // Importa o módulo path
import cors from "cors";

const __dirname = path.resolve(); // Define __dirname corretamente
const server = express(); // Instância do express

server.use(cors());

// Rota que retorn todos os produtos
server.get("/", (req, res) => {
  Produto.findAll()
  .then(dados => {
    res.json(dados);
  })
  .catch(erro => {
    console.log("erro ao pegar produtos: ", erro)
  })
});

// Rota para cadastro de produto
server.get("/produto/:nome/:preco/:quantidade/:descricao", (req, res) => {
  Produto.create({
    nome: req.params.nome,
    preco: req.params.preco,
    quantidade: req.params.quantidade,
    descricao: req.params.descricao,
  })
  res.send("produto cadastrado com sucesso")
});

// Rota para consulta
server.get("/consulta/:id", (req, res) => {
  let idDigitado = req.params.id;
  Produto.findOne({ where: {id: idDigitado}})
    .then(dados => {
      res.json(dados);
    })
    .catch(erro => {
      console.log("erro ao pegar produtos: ", erro)
    })
});

server.get("/delete/:id", (req, res) => {
  let idDigitado = req.params.id;
  Produto.destroy({ where: { id: `${idDigitado}` }})
  res.send("Exclusão bem sucedida");
});

server.get("/update/:id/:nome/:preco/:quantidade/:descricao", (req, res) => {
  let idDig = req.params.id;
  let nomeDig = req.params.nome;
  let precoDig = req.params.preco;
  let quantidadeDig = req.params.quantidade;
  let descricaoDig = req.params.descricao;
  Produto.update(
      { 
        nome: nomeDig,
        preco: precoDig,
        quantidade: quantidadeDig,
        descricao: descricaoDig
       },
      { where: { id: idDig } })
  res.send("atualização bem sucedida");
})


// Inicia o server na porta 3030
server.listen(3000, () => {
  console.log("------------------------")
  console.log("PORTA: 3000");
  console.log("------------------------")
  console.log("Conexão com o server: ok");
  console.log("------------------------")
});

//EXEMPLO DE INSERT:
// Usuario.create({
//     nome: 'João',
//     email: 'joao@example.com',
//     idade: 25
//   }).then(usuario => {
//     console.log('Usuário criado:', usuario);
//   }).catch(error => {
//     console.log('Erro ao criar usuário:', error);
//   });

//EXEMPLO DE UPDATE:
// Usuario.update(
//     { idade: 26 }, // Dados a serem atualizados
//     { where: { id: 1 } } // Condição para encontrar o registro
//   ).then(result => {
//     console.log('Registros atualizados:', result);
//   }).catch(error => {
//     console.log('Erro ao atualizar:', error);
//   });

//EXEMPLO DE DELETE:
// Usuario.destroy({
//     where: { id: 1 } // Condição para encontrar o registro a ser deletado
//   }).then(() => {
//     console.log('Usuário deletado');
//   }).catch(error => {
//     console.log('Erro ao deletar:', error);
//   });
