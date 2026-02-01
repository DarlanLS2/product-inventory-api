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

import init from "./app.js"

const app = await init(
  { syncDatabase },
  { User, Product },
  { UserRepository, ProductRepository },
  { UserController, ProductController },
  { UserService },
  { UserRoute, ProductRoute },
  { authMidleware },
)

app.listen(process.env.PORT, "0.0.0.0", () => {
  console.log(`
    ------------------------\n
    PORTA: ${process.env.PORT}\n
    ------------------------\n
    Conexão com o app: ok\n
    ------------------------\n
    `);
});
