import express from "express";
import path from "path";
import cors from "cors";
import { Product } from "./src/models/productModel.js"
import { ProductRepository } from "./src/repositories/productRepository.js";
import { ProductController } from "./src/controllers/productController.js";
import { ProductRoute } from "./src/routes/productRoute.js";

const __dirname = path.resolve(); 
const server = express(); 

server.use(cors());
server.use(express.json());

const repository = new ProductRepository(Product)
const controller = new ProductController(repository)
const route = new ProductRoute(server, controller)
route.createRoutes()

server.listen(3000, () => {
  console.log(`
    ------------------------\n
    PORTA: 3000\n
    ------------------------\n
    Conexão com o server: ok\n
    ------------------------\n
    `);
});

