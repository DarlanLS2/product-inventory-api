import express from "express"; 
import {Usuario, Produto} from "./banco_de_dados/conexao_com_sequelize.js" 
import path from "path"; // Importa o módulo path
import cors from "cors";

const __dirname = path.resolve(); // Define __dirname corretamente
const server = express(); // Instância do express

server.use(cors());

// Sapo
const sapo =                                                    

    "⬛⬛⬛⬛⬛🟩🟩⬛🟩🟩⬛⬛⬛\n" +
    "⬛⬛⬛⬛🟩🟩🟩🟩🟩🟩🟩⬛⬛\n" + 
    "⬛⬛⬛🟩🟩⬜⬛⬜⬜⬛🟩⬛⬛\n" + 
    "⬛⬛⬛🟩🟩🟩🟩🟩🟩🟩⬛⬛⬛\n" +
    "⬛⬛🟩🟩🟩🟩🟫🟫🟫🟫⬛⬛⬛\n" +
    "⬛⬛🟩🟩🟩🟩🟩🟩🟩⬛⬛⬛⬛\n";

// Rota que retorna um sapo
server.get("/", (req, res) => {
  return res.send("<pre>" + sapo + "</pre>");
});

/**************************
 * AFONSO OLHA ESTA PARTE *
 **************************/

server.get("/usuario/:nome/:email/:senha", (req, res) => {
    res.send({
      nome: req.params.nome,
      email: req.params.email,
      senha: req.params.senha,
    })
});

server.get("/produto/:nome/:preco/:quantidade/:descricao", (req, res) => {
    res.send({
      nome: req.params.nome,
      preco: req.params.preco,
      quantidade: req.params.quantidade,
      descricao: req.params.descricao
    })
});


// Rota que retorna o JSON da tabela usuario
server.get("/usuario", (req, res) => {
    Usuario.findAll()
      .then(dados => {
        res.json(dados)
      })
      .catch(erro => {
        console.log("erro ao pegar usuarios: ", erro);
      })
});

// Rota que retorna o JSON da tabela produto
server.get("/produto", (req, res) => {
    Produto.findAll()
      .then(dados => {
        res.json(dados);
      })
      .catch(erro => {
        console.log("erro ao pegar produtos: ", erro)
      })
});

// Rota que retorna o produto com ID digitado na URL
server.get("/consulta/:id", (req, res) => {
    let idDigitado = req.params.id;
    Produto.findOne({ where: {id: idDigitado}})
      .then(dados => {
        res.json(dados);
      })
      .catch(erro => {
        console.log("erro ao achar o produto com id")
      })
});

// Rota que envia o arquivo HTML
server.get("/html", (req, res) => {
    res.sendFile(path.join(__dirname, "html", "index.html")); // Usa path.join para construir o caminho
});

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
