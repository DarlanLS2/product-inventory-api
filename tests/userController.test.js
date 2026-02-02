import { error } from "console";
import { UserController } from "../src/controllers/userController.js"
import { ValidationError } from "../src/errors/ValidationError.js";

let mockService;
let controller
let req;
let res;

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

  it("return 201 when there is not error", async () => {
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

  it("return 500 when service return unexpected error", async () => {
    const errorMessage = "unexpected database error"
    mockService.register.mockRejectedValue(new Error(errorMessage))

    await controller.register(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
  })
})


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

  it("return 400 when service return null", async () => {
    mockService.login.mockResolvedValue(null);

    await controller.login(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ field: "email or passWord", message: "invalid" });
  })

  it("return 500 when service return unexpected error", async () => {
    const errorMessage = "unexpected database error"
    mockService.login.mockRejectedValue(new Error(errorMessage))

    await controller.login(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: errorMessage});
  })

  it("call service login correctly", async () => {
    await controller.login(req, res);

    expect(mockService.login).toHaveBeenCalledWith(req.body)
  })
})
