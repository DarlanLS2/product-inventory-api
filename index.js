import express from "express"; 
import {Produto} from "./banco_de_dados/conexao_com_sequelize.js" 
import path from "path"; // Importa o módulo path
import cors from "cors";

const __dirname = path.resolve(); // Define __dirname corretamente
const server = express(); // Instância do express

server.use(cors());

class ProductApi {
  constructor(port) {
    this.port = port;
    this.logMessage =  `
    ------------------------
    PORTA: ${this.port}
    ------------------------
    Conexão com o server: ok
    ------------------------
    `;
  }

  initServer() {
    this.createRoutes();
    this.openPort(this.port);
  }

  openPort(port) {
    server.listen(port, () => this.showLogMessage());
  }

  showLogMessage() {
    console.log(this.logMessage);
  }

  createRoutes() {
    this.createRouteFindAllProducts()
    this.createRouteRegisterProduct()
    this.createRouteSearchProduct();
    this.createRouteDeleteProduct();
    this.createRouteUpdateProduct();
  }

  createRouteFindAllProducts() {
    server.get("/", (req, res) => {
      Produto.findAll()
        .then(dados => {
          res.json(dados);
        })
        .catch(erro => {
          console.log("erro ao pegar produtos: ", erro)
        })
    });
  }

  createRouteRegisterProduct() {
    server.get("/produto/:nome/:preco/:quantidade/:descricao", (req, res) => {
      Produto.create({
        nome: req.params.nome,
        preco: req.params.preco,
        quantidade: req.params.quantidade,
        descricao: req.params.descricao,
      })
      res.send("produto cadastrado com sucesso")
    });
  }
  
  createRouteSearchProduct() {
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
  }

  createRouteDeleteProduct() {
    server.get("/delete/:id", (req, res) => {
      let idDigitado = req.params.id;
      Produto.destroy({ where: { id: `${idDigitado}` }})
      res.send("Exclusão bem sucedida");
    });
  }
  
  createRouteUpdateProduct() {
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
  }
}

const api = new ProductApi(port);
api.initServer();

