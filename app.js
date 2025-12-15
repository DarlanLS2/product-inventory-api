import express from "express";
import path from "path"; // Importa o módulo path
import cors from "cors";
import { ProductRepository } from "./src/repositories/productRepository.js";
import { ProductService } from "./src/services/productService.js";
import { ProductController } from "./src/controllers/productController.js";
import { ProductRoute } from "./src/routes/productRoute.js";

const __dirname = path.resolve(); // Define __dirname corretamente
const server = express(); // Instância do express

server.use(cors());
server.use(express.json());

const repository = new ProductRepository()
const service = new ProductService(repository)
const controller = new ProductController(service)
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

