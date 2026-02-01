import dotenv from "dotenv";
import express from "express";
import cors from "cors";

export default async function(
  database,
  models,
  repositories,
  controllers,
  services,
  routes,
  middlewares
) {
  dotenv.config();

  const app = express(); 
  app.use(cors());
  app.use(express.json());

  await database.syncDatabase();

  const userRepository = new repositories.UserRepository(models.User);
  const userService = new services.UserService(userRepository);
  const userController = new controllers.UserController(userService);
  const userRoutes = new routes.UserRoute(app, middlewares.authMidleware, userController);
  userRoutes.create();

  const productRepository = new repositories.ProductRepository(models.Product)
  const productController = new controllers.ProductController(productRepository)
  const productRoutes = new routes.ProductRoute(app, middlewares.authMidleware, productController)
  productRoutes.create()

  return app;
}
