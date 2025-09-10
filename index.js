import express from "express"; 
import {Produto} from "./banco_de_dados/conexao_com_sequelize.js" 
import path from "path"; // Importa o módulo path
import cors from "cors";

const __dirname = path.resolve(); // Define __dirname corretamente
const server = express(); // Instância do express

server.use(cors());

class ProductApi {
  constructor() {
    this.defaultPort = 3000;
    this.logMessage =  `
    ------------------------
    PORTA: 3000
    ------------------------
    Conexão com o server: ok
    ------------------------
    `;
  }

  initServer() {
    this.createRoutes();
    this.openPort();
  }

  openPort() {
    server.listen(this.defaultPort, () => this.showLogMessage());
  }

  showLogMessage() {
    console.log(this.logMessage);
  }

  createRoutes() {
    this.createRouteFindAllProducts()
    this.setupRouteRegisterProduct()
    this.createRouteSearchProduct();
    this.setupRouteDeleteProduct();
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

  async setupRouteRegisterProduct() {
    server.post("/product/:nome/:preco/:quantidade/:descricao", async (req, res) => {
      await this.handleRegisterProduct(req, res);
    });
  }

  async handleRegisterProduct(req, res) {
    try {
      await this.registerProduct(req)
      res.status(200).send({message: "Produto registrado com sucesso"})
    } catch (err) {
      res.status(500).send({erro: err})
    }
  }

  async registerProduct(req) {
    let isCreated = await Produto.create({
      nome: req.params.nome,
      preco: req.params.preco,
      quantidade: req.params.quantidade,
      descricao: req.params.descricao,
    });
    if (!isCreated) {
      throw new Eror("Erro ao cadastrar produto");
    }
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

  async setupRouteDeleteProduct() {
    server.delete("/product/:id", async (req, res) => {
      await this.handleDeleteProduct(req, res);
    });
  }

  async handleDeleteProduct(req, res) {
    try {
      await this.deleteProduct(req.params.id);
      res.status(200).send({message: "Produto excluido com sucesso"});
    } catch (erro) {
      res.status(500).send({erro: erro.message})
    }
  }

  async deleteProduct(productId) {
    let isDeleted = await Produto.destroy({where: {id: `${productId}`}})
    if (isDeleted == 0) {
      throw new Error("Erro ao deletar produto");
    }
  }

  createRouteUpdateProduct() {
    server.put("/update/:id/:nome/:preco/:quantidade/:descricao", (req, res) => {
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
        { where: { id: idDig } }
      )
      res.send("atualização bem sucedida");
    })
  }
}

const api = new ProductApi();
api.initServer();

