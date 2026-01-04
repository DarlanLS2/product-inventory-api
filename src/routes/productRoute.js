export class ProductRoute {
  constructor(server, productController) {
    this.controller = productController
    this.server = server;
  }

  createRoutes() {
    this.server.get("/", async (req, res) => {
      await this.controller.getAll(req, res)
    });
    this.server.get("/product/:id", async (req, res) => {
      await this.controller.getById(req, res);
    });
    this.server.post("/product", async (req, res) => {
      await this.controller.register(req, res);
    });
    this.server.put("/product", async (req, res) => {
      await this.controller.update(req, res);
    })
    this.server.delete("/product/:id", async (req, res) => {
      await this.controller.delete(req, res);
    });
  }
}

