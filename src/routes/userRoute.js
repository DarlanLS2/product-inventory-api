export class UserRoute {
  constructor(server, userController) {
    this.controller = userController
    this.server = server;
  }

  create() {
    this.server.get("/user", async (req, res) => {
      await this.controller.login(req, res);
    });
    this.server.post("/user", async (req, res) => {
      await this.controller.register(req, res);
    });
    this.server.delete("/user/:id", async (req, res) => {
      await this.controller.delete(req, res);
    });
  }
}

