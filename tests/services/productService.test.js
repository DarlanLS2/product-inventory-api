import { ProductService } from "../../dist/services/productService.js";
import { NotFoundError } from "../../dist/errors/NotFoundError.js";

jest.mock("../../dist/entities/Product.js")

let repository;
let service;


describe("getById", () => {
  beforeEach(() => {
    repository = {
      getById: jest.fn()
    }

    service = new ProductService(repository);

    jest.clearAllMocks()
  })

  it("Throws Error when id is undefined", async () => {
    expect(service.getById("")).rejects.toThrow(Error)
  })

  it("Throes NotFoundError when repository returns undefined", () => {
    repository.getById.mockResolvedValue("")

    expect(service.getById("1")).rejects.toThrow(NotFoundError)
  })
})

describe("update", () => {
  beforeEach(() => {
    repository = {
      update: jest.fn()
    }

    service = new ProductService(repository);

    jest.clearAllMocks()
  })

  it("Throes NotFoundError when repository returns 0", () => {
    repository.update.mockResolvedValue([0, "mock"])

    expect(service.update("1")).rejects.toThrow(NotFoundError)
  })
})

describe("delete", () => {
  beforeEach(() => {
    repository = {
      delete: jest.fn()
    }

    service = new ProductService(repository);

    jest.clearAllMocks()
  })

  it("Throws Error when id is undefined", async () => {
    expect(service.delete("")).rejects.toThrow(Error)
  })

  it("Throes NotFoundError when repository returns undefined", () => {
    repository.delete.mockResolvedValue(0)

    expect(service.delete("1")).rejects.toThrow(NotFoundError)
  })
})
