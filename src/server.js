import { syncDatabase } from "./database/sync.js";
import { User } from "./database/models/userModel.js";
import { UserRepository } from "./repositories/userRepository.js";
import { UserController } from "./controllers/userController.js";
import { UserService } from "./services/userService.js";
import { UserRoute } from "./routes/userRoute.js"

import { authMiddleware } from "./authentication/authMiddleware.js";

import { Product } from "./database/models/productModel.js"
import { ProductRepository } from "./repositories/productRepository.js";
import { ProductController } from "./controllers/productController.js";
import { ProductRoute } from "./routes/productRoute.js";

import init from "./app.js"

const app = await init(
  { syncDatabase },
  { User, Product },
  { UserRepository, ProductRepository },
  { UserController, ProductController },
  { UserService },
  { UserRoute, ProductRoute },
  { authMiddleware },
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
