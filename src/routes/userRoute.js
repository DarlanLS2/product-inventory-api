export class UserRoute {
  constructor(server, authMiddleware, userController) {
    this.controller = userController
    this.authMiddleware = authMiddleware
    this.server = server;
  }

  create() {
    this.server.get("/user", async (req, res) => {
      await this.controller.login(req, res);
    });
    this.server.post("/user", async (req, res) => {
      await this.controller.register(req, res);
    });
    this.server.delete("/user", this.authMiddleware, async (req, res) => {
      await this.controller.delete(req, res);
    });
  }
}

