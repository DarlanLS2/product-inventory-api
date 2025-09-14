import express from "express";
import { Product } from "./models/index.js";
import path from "path"; // Importa o módulo path
import cors from "cors";

const __dirname = path.resolve(); // Define __dirname corretamente
const server = express(); // Instância do express

server.use(cors());


class ProductApi {
  constructor() {
    this.defaultPort = 3000;
  }

  initServer() {
    this.createRoutes();
    this.openPort();
  }

  createRoutes() {
    this.setupRouteFindAllProducts()
    this.setupRouteGetProduct();
    this.setupRouteRegisterProduct()
    this.setupRouteUpdateProduct();
    this.setupRouteDeleteProduct();
  }

  async setupRouteFindAllProducts() {
    server.get("/", async (req, res) => {
      await this.handleGetAllProducts(req, res)
    });
  }

  async handleGetAllProducts(req, res) {
    try {
      let productsData = await this.getAllProducts();
      res.status(200).json(productsData)
    } catch(erro) {
      res.status(500).send({error: erro.message})
    }
  }

  async getAllProducts() {
    try {
      const productsData = await Product.findAll();
      return productsData;
    } catch (erro) {
      throw new Error(erro.message);
    }
  }
  
  async setupRouteGetProduct() {
    server.get("/product/:id", async (req, res) => {
      await this.handleGetProduct(req, res);
    });
  }

  async handleGetProduct(req, res) {
    try {
      let productData = await this.getProduct(req.params.id);
      res.status(200).json(productData)
    } catch (err) {
      res.status(500).send({erro: err})
    }
  }

  async getProduct(id) {
    try{
      return await Product.findOne({ where: {id: id}});
    } catch (err) {
      throw new Error("Erro ao buscar produto");
    }
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
    let isCreated = await Product.create({
      nome: req.params.nome,
      preco: req.params.preco,
      quantidade: req.params.quantidade,
      descricao: req.params.descricao,
    });
    if (!isCreated) {
      throw new Eror("Erro ao cadastrar produto");
    }
  }

  async setupRouteUpdateProduct() {
    server.put("/update/:id/:name/:price/:quantity/:description", async (req, res) => {
      await this.handleUpdateProdut(req, res);
    })
  }

  async handleUpdateProdut(req, res) {
    try {
      let productId = req.params.id;
      let newProcuctData = {
        name: req.params.name,
        price: req.params.price,
        quantity: req.params.quantity,
        description: req.params.description
      };

      await this.updateProduct(productId, newProcuctData);
      res.status(200).send({message: "Product atualizado com sucesso"})
    } catch (err) {
      res.status(500).send({erro: err})
    }
  }

  async updateProduct(productId, newProductData) {
    try {
      await Product.update(
        {
          nome: newProductData.name,
          preco: newProductData.price,
          quantidade: newProductData.quantity,
          descricao: newProductData.description
        },
        { where: { id: productId } }
      )
    } catch (err) {
      throw new Error("Erro ao atualizar Produto")
    }
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
    let isDeleted = await Product.destroy({where: {id: `${productId}`}})
    if (isDeleted == 0) {
      throw new Error("Erro ao deletar produto");
    }
  }


  openPort() {
    server.listen(this.defaultPort, () => this.showLogMessage());
  }

  showLogMessage() {
    console.log(`
      ------------------------\n
      PORTA: 3000\n
      ------------------------\n
      Conexãaaao com o server: ok\n
      ------------------------\n
      `);
  }
}

const api = new ProductApi();
api.initServer();

