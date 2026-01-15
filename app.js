import dotenv from "dotenv";
import express from "express";
import path from "path";
import cors from "cors";
import { User } from "./src/models/userModel.js";
import { UserRepository } from "./src/repositories/userRepository.js";
import { UserController } from "./src/controllers/userController.js";
import { UserService } from "./src/services/userService.js";
import { UserRoute } from "./src/routes/userRoute.js"

import { authMidleware } from "./src/authentication/authMidleware.js";

import { Product } from "./src/models/productModel.js"
import { ProductRepository } from "./src/repositories/productRepository.js";
import { ProductController } from "./src/controllers/productController.js";
import { ProductRoute } from "./src/routes/productRoute.js";

dotenv.config();

const __dirname = path.resolve(); 
const server = express(); 

server.use(cors());
server.use(express.json());

// Product.sync({ force: true })
// User.sync({ force: true })

const userRepository = new UserRepository(User);
const userService = new UserService(userRepository);
const userController = new UserController(userService);
const userRoutes = new UserRoute(server, userController);
userRoutes.create();

const productRepository = new ProductRepository(Product)
const productController = new ProductController(productRepository)
const productRoutes = new ProductRoute(server, authMidleware, productController)
productRoutes.create()

server.listen(process.env.PORT, () => {
  console.log(`
    ------------------------\n
    PORTA: ${process.env.PORT}\n
    ------------------------\n
    Conexão com o server: ok\n
    ------------------------\n
    `);
});

