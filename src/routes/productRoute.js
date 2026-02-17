export class ProductRoute {
  constructor(server, authMiddleware, productController) {
    this.controller = productController
    this.authMiddleware = authMiddleware
    this.server = server;
  }

  create() {
    this.server.get("/product", this.authMiddleware, async (req, res) => {
      await this.controller.getAll(req, res)
    });
    this.server.get("/product/:id", this.authMiddleware, async (req, res) => {
      await this.controller.getById(req, res);
    });
    this.server.post("/product", this.authMiddleware, async (req, res) => {
      await this.controller.register(req, res);
    });
    this.server.put("/product", this.authMiddleware, async (req, res) => {
      await this.controller.update(req, res);
    })
    this.server.delete("/product/:id", this.authMiddleware, async (req, res) => {
      await this.controller.delete(req, res);
    });
  }
}

