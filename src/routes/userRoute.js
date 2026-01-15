export class UserRoute {
  constructor(server, authMidleware, userController) {
    this.controller = userController
    this.authMidleware = authMidleware
    this.server = server;
  }

  create() {
    this.server.get("/user", async (req, res) => {
      await this.controller.login(req, res);
    });
    this.server.post("/user", async (req, res) => {
      await this.controller.register(req, res);
    });
    this.server.delete("/user", this.authMidleware, async (req, res) => {
      await this.controller.delete(req, res);
    });
  }
}

