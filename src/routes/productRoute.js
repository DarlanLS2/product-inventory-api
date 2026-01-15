export class ProductRoute {
  constructor(server, authMidleware, productController) {
    this.controller = productController
    this.authMidleware = authMidleware
    this.server = server;
  }

  create() {
    this.server.get("/product", this.authMidleware, async (req, res) => {
      await this.controller.getAll(req, res)
    });
    this.server.get("/product/:id", this.authMidleware, async (req, res) => {
      await this.controller.getById(req, res);
    });
    this.server.post("/product", this.authMidleware, async (req, res) => {
      await this.controller.register(req, res);
    });
    this.server.put("/product", this.authMidleware, async (req, res) => {
      await this.controller.update(req, res);
    })
    this.server.delete("/product/:id", this.authMidleware, async (req, res) => {
      await this.controller.delete(req, res);
    });
  }
}

