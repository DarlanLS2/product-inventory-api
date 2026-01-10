export class ProductRoute {
  constructor(server, userController) {
    this.controller = userController
    this.server = server;
  }

  create() {
    this.server.get("/user/:email", async (req, res) => {
      await this.controller.getByEmail(req, res);
    });
    this.server.post("/user", async (req, res) => {
      await this.controller.register(req, res);
    });
    this.server.put("/user/:id", async (req, res) => {
      await this.controller.update(req, res);
    })
    this.server.delete("/user/:id", async (req, res) => {
      await this.controller.delete(req, res);
    });
  }
}

