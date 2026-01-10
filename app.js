import express from "express";
import path from "path";
import cors from "cors";
import { User } from "./src/models/userModel.js";
import { UserRepository } from "./src/repositories/userRepository.js";
import { UserController } from "./src/controllers/userController.js";
import { UserService } from "./src/services/userService.js";
import { UserRoute } from "./src/routes/userRoute.js"

import { Product } from "./src/models/productModel.js"
import { ProductRepository } from "./src/repositories/productRepository.js";
import { ProductController } from "./src/controllers/productController.js";
import { ProductRoute } from "./src/routes/productRoute.js";

const __dirname = path.resolve(); 
const server = express(); 

server.use(cors());
server.use(express.json());

const userRepository = new UserRepository(User);
const userService = new UserService(userRepository);
const userController = new UserController(userService);
const userRoutes = new UserRoute(userController);
userRoutes.create();

const productRepository = new ProductRepository(Product)
const productController = new ProductController(productRepository)
const productRoutes = new ProductRoute(server, productController)
productRoutes.create()

server.listen(3000, () => {
  console.log(`
    ------------------------\n
    PORTA: 3000\n
    ------------------------\n
    Conexão com o server: ok\n
    ------------------------\n
    `);
});

