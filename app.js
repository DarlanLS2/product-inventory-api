import dotenv from "dotenv";
import express from "express";
import path from "path";
import cors from "cors";
import { syncDatabase } from "./src/database/sync.js";
import { User } from "./src/database/models/userModel.js";
import { UserRepository } from "./src/repositories/userRepository.js";
import { UserController } from "./src/controllers/userController.js";
import { UserService } from "./src/services/userService.js";
import { UserRoute } from "./src/routes/userRoute.js"

import { authMidleware } from "./src/authentication/authMidleware.js";

import { Product } from "./src/database/models/productModel.js"
import { ProductRepository } from "./src/repositories/productRepository.js";
import { ProductController } from "./src/controllers/productController.js";
import { ProductRoute } from "./src/routes/productRoute.js";

dotenv.config();

const __dirname = path.resolve(); 
const app = express(); 

app.use(cors());
app.use(express.json());

await syncDatabase();

const userRepository = new UserRepository(User);
const userService = new UserService(userRepository);
const userController = new UserController(userService);
const userRoutes = new UserRoute(app, authMidleware, userController);
userRoutes.create();

const productRepository = new ProductRepository(Product)
const productController = new ProductController(productRepository)
const productRoutes = new ProductRoute(app, authMidleware, productController)
productRoutes.create()

export default app;
