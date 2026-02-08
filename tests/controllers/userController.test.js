import { UserController } from "../../src/controllers/userController.js"
import { NotFoundError } from "../../src/errors/NotFoundError.js";
import { ValidationError } from "../../src/errors/ValidationError.js";

let mockService;
let controller
let req;
let res;

describe("login", () => {
  beforeEach(() => {
    mockService = {
      login: jest.fn()
    }

    controller = new UserController(mockService);

    req = {
      body: { email: "random@gmail.com", passWord: "1234" }
    }

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }

    jest.clearAllMocks()
  })

  it("return 200 when service return token", async () => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
    mockService.login.mockResolvedValue({ token: token })

    await controller.login(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ token: token });
  })

  it("return 400 when inputs are invalid", async () => {
    mockService.login.mockRejectedValue(new ValidationError());

    await controller.login(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      title: "Invalid input", 
      detail: "Email or password format is invalid"
    });
  })

  it("return 404 when user is not found", async () => {
    mockService.login.mockRejectedValue(new NotFoundError());

    await controller.login(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      title: "User not found", 
      detail: "No user found with the provided email"
    });
  })

  it("return 500 when service return unexpected error", async () => {
    const errorMessage = "unexpected database error"
    mockService.login.mockRejectedValue(new Error(errorMessage))

    await controller.login(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      title: "Unexpected error",
      detail: "unexpected database error",
    });
  })
})

describe("register", () => {
  beforeEach(() => {
    mockService = {
      register: jest.fn()
    }

    controller = new UserController(mockService);

    req = {
      body: { email: "random@gmail.com", passWord: "1234" }
    }

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      set: jest.fn()
    }

    jest.clearAllMocks()
  })

  it("return 201 on success", async () => {
    const user = {
      id: 1,
      email: req.body.email,
      passWord: req.body.passWord
    }

    mockService.register.mockResolvedValue(user)

    await controller.register(req, res);

    expect(res.status).toHaveBeenCalledWith(201)
    expect(res.json).toHaveBeenCalledWith(user)
  })

  it("return 400 when service throw ValidadationError", async () => {
    mockService.register.mockRejectedValue(new ValidationError("email", "required"));

    await controller.register(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ field: "email", message: "required"});
  })

  it("return 409 when email already in use", async () => {
    const error = new Error();
    error.name = "SequelizeUniqueConstraintError"
    mockService.register.mockRejectedValue(error);

    await controller.register(req, res);

    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith({ error: "email already in use" });
  })

  it("return 500 when service return unexpected error", async () => {
    const errorMessage = "unexpected database error"
    mockService.register.mockRejectedValue(new Error(errorMessage))

    await controller.register(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
  })
})

describe("delete", () => {
  beforeEach(() => {
    mockService = {
      delete: jest.fn()
    }

    controller = new UserController(mockService);

    req = {
      body: { email: "random@gmail.com", passWord: "1234" }
    }

    res = {
      status: jest.fn().mockReturnThis(),
      sendStatus: jest.fn().mockReturnThis(),
      json: jest.fn(),
      set: jest.fn()
    }

    jest.clearAllMocks()
  })

  it("return 204 on success", async () => {
    mockService.delete.mockResolvedValue("mock")

    await controller.delete(req, res);

    expect(res.sendStatus).toHaveBeenCalledWith(204);
  })

  it("return 400 when service return null", async () => {
    mockService.delete.mockResolvedValue(null)

    await controller.delete(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      field: "email or passWord",
      message: "invalid"
    });
  })

  it("return 400 when service throw ValidationError", async () => {
    mockService.delete.mockRejectedValue(new ValidationError("mock"))

    await controller.delete(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      field: "email or passWord",
      message: "invalid"
    });
  })

  it("return 500 when service return unexpected error", async () => {
    const errorMessage = "unexpected database error"
    mockService.delete.mockRejectedValue(new Error(errorMessage))

    await controller.delete(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
  })
})
