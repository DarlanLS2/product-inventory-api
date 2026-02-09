import { ProductController } from "../../src/controllers/productController.js";
import { ValidationError } from "../../src/errors/ValidationError.js";
import { Product } from "../../src/entities/Product.js"

jest.mock("../../src/entities/Product.js")

let repository;
let products;
let controller;
let req;
let res;

describe("getAll", () => {
  beforeEach(() => {
    repository = {
      getAll: jest.fn()
    }
    controller = new ProductController(repository);

    products = [
      { name: "mock1" },
      { name: "mock2" },
      { name: "mock3" }
    ]
    req = {
      body: "mock"
    }

    res = {
      set: jest.fn(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }

    jest.clearAllMocks()
  })

  it("return 200 on success", async () => {
    repository.getAll.mockResolvedValue(products);

    await controller.getAll(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(products)
  })

  it("return 500 when repository throws unexpected error", async () => {
    repository.getAll.mockRejectedValue(new Error("unexpected database error"));

    await controller.getAll(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      title: "Unexpected error",
      detail: "unexpected database error",
    })
  })
})

describe("getById", () => {
  beforeEach(() => {
    repository = {
      getById: jest.fn()
    }
    controller = new ProductController(repository);

    products = [
      { name: "mock1" },
      { name: "mock2" },
      { name: "mock3" }
    ]
    req = {
      params: {
        id: 1
      }
    }

    res = {
      set: jest.fn(),
      status: jest.fn().mockReturnThis(),
      sendStatus: jest.fn().mockReturnThis(),
      json: jest.fn()
    }

    jest.clearAllMocks()
  })

  it("return 200 on success", async () => {
    repository.getById.mockResolvedValue(products[1]);

    await controller.getById(req, res);

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith(products[1])
  })

  it("return 404 when throws NotFoundError", async () => {
    repository.getById.mockResolvedValue(null);

    await controller.getById(req, res);

    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.json).toHaveBeenCalledWith({
      title: "Product not found", 
      detail: "No product found with the provided id"
    })
  })

  it("return 500 when repository throws unexpected error", async () => {
    repository.getById.mockRejectedValue(new Error("unexpected database error"));

    await controller.getById(req, res);

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({
      title: "Unexpected error",
      detail: "unexpected database error",
    })
  })
})

describe("register", () => {
  beforeEach(() => {
    repository = {
      register: jest.fn()
    }
    controller = new ProductController(repository);

    products = [
      { name: "mock1" },
      { name: "mock2" },
      { name: "mock3" }
    ]
    req = {
      body: "mock"
    }

    res = {
      set: jest.fn(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }

    jest.clearAllMocks()
  })

  it("return 201 on success", async () => {
    Product.mockImplementation((body) => (body))
    repository.register.mockResolvedValue(products[1])

    await controller.register(req, res);
    
    expect(res.status).toHaveBeenCalledWith(201)
    expect(res.json).toHaveBeenCalledWith(products[1])
  })

  it("return 400 when product have invalid field", async () => {
    Product.mockImplementation(() => {
      throw new ValidationError("name", "required")
    })
    repository.register.mockResolvedValue(products[1])

    await controller.register(req, res);
    
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({
      title: "Invalid input",
      detail: "Invalid name format"
    })
  })

  it("return 500 when repository throws unexpected error", async () => {
    Product.mockImplementation((body) => (body));
    repository.register.mockRejectedValue(new Error("unexpected database error"))

    await controller.register(req, res);
    
    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({
      title: "Unexpected error",
      detail: "unexpected database error",
    })
  })
})

describe("update", () => {
  beforeEach(() => {
    repository = {
      update: jest.fn()
    }
    controller = new ProductController(repository);

    products = [
      { name: "mock1" },
      { name: "mock2" },
      { name: "mock3" }
    ]
    req = {
      body: "mock"
    }

    res = {
      set: jest.fn(),
      status: jest.fn().mockReturnThis(),
      sendStatus: jest.fn().mockReturnThis(),
      json: jest.fn()
    }

    jest.clearAllMocks()
  })

  it("return 204 on success", async () => {
    Product.mockImplementation((body) => body);
    repository.update.mockResolvedValue([1])

    await controller.update(req, res);

    expect(res.sendStatus).toHaveBeenCalledWith(204);
  })

  it("return 400 when product hava invalida field", async () => {
    Product.mockImplementation(() => {
      throw new ValidationError("name", "required")
    });

    await controller.update(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      title: "Invalid input",
      detail: "Invalid name format"
    });
  })

  it("return 404 when throws NotFoundError", async () => {
    Product.mockImplementation((body) => body);
    repository.update.mockResolvedValue([0])

    await controller.update(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      title: "Product not found", 
      detail: "No product found with the provided id"
    });
  })

  it("return 500 when repository throws unexpected error", async () => {
    Product.mockImplementation((body) => body);
    repository.update.mockRejectedValue(new Error("unexpected database error"))

    await controller.update(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      title: "Unexpected error",
      detail: "unexpected database error",
    });
  })
})

describe("delete", () => {
  beforeEach(() => {
    repository = {
      delete: jest.fn()
    }
    controller = new ProductController(repository);

    products = [
      { name: "mock1" },
      { name: "mock2" },
      { name: "mock3" }
    ]
    req = {
      params: {
        id: 1
      }
    }

    res = {
      set: jest.fn(),
      status: jest.fn().mockReturnThis(),
      sendStatus: jest.fn().mockReturnThis(),
      json: jest.fn()
    }

    jest.clearAllMocks()
  })

  it("return 204 on success", async () => {
    repository.delete.mockResolvedValue(1)

    await controller.delete(req, res);

    expect(res.sendStatus).toHaveBeenCalledWith(204);
  })

  it("return 404 when throws NotFoundError", async () => {
    repository.delete.mockResolvedValue(0)

    await controller.delete(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      title: "Product not found", 
      detail: "No product found with the provided id"
    });
  })

  it("return 500 when repository throws unexpected error", async () => {
    repository.delete.mockRejectedValue(new Error("unexpected database error"))

    await controller.delete(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      title: "Unexpected error",
      detail: "unexpected database error",
    });
  })
})
