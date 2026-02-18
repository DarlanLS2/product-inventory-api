import dotenv from "dotenv";
import express from "express";
import cors from "cors";

import { syncDatabase } from "./database/sync.js";
import { authMiddleware } from "./authentication/authMiddleware.js";

import type { ProductModel } from "./repositories/productModel.js";
import { ProductRepository } from "./repositories/productRepository.js";
import { ProductController } from "./controllers/productController.js";
import { ProductService } from "./services/productService.js";
import { ProductRoute } from "./routes/productRoute.js";

import type { UserModel } from "./repositories/UserModel.js";
import { UserRepository } from "./repositories/userRepository.js";
import { UserController } from "./controllers/userController.js";
import { UserService } from "./services/userService.js";
import { UserRoute } from "./routes/userRoute.js"

type Database = {
  syncDatabase: typeof syncDatabase;
}

type Models = {
  User: UserModel,
  Product: ProductModel
}

type Repositories = {
  UserRepository: typeof UserRepository,
  ProductRepository: typeof ProductRepository
}

type Controllers = {
  UserController: typeof UserController,
  ProductController: typeof ProductController
}

type Services = {
  UserService: typeof UserService
  ProductService: typeof ProductService
}

type Routes = {
  UserRoute: typeof UserRoute,
  ProductRoute: typeof ProductRoute,
}

type Middlewares = {
  authMiddleware: typeof authMiddleware;
}


export default async function(
  database: Database,
  models: Models,
  repositories: Repositories,
  controllers: Controllers,
  services: Services,
  routes: Routes,
  middlewares: Middlewares
) {
  dotenv.config();

  const app = express(); 

  app.use(cors());
  app.use(express.json());

  await database.syncDatabase();

  const userRepository = new repositories.UserRepository(models.User);
  const userService = new services.UserService(userRepository);
  const userController = new controllers.UserController(userService);
  const userRoutes = new routes.UserRoute(app, middlewares.authMiddleware, userController);

  userRoutes.create();

  const productRepository = new repositories.ProductRepository(models.Product)
  const productService = new services.ProductService(productRepository);
  const productController = new controllers.ProductController(productService)
  const productRoutes = new routes.ProductRoute(app, middlewares.authMiddleware, productController)

  productRoutes.create()

  return app;
}
