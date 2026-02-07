import  { ProductService } from "../../src/services/productService.js"

describe("ProductService", () => {
  let repositoryMock;
  let service;

  beforeEach(() => {
    repositoryMock = {
      getAll: jest.fn(),
      getById: jest.fn()
    }

    service = new ProductService(repositoryMock)
  })

  describe("getAll", () => {
    test("deve lançar erro de dominio quando repository retorna array vazio", async () => {
      repositoryMock.getAll.mockResolvedValue([])

      await expect(service.getAll())
        .rejects
        .toThrow("Não há produtos");
    })
  })

  describe("getById", () => {
    test("deve lançar erro de dominio quando repository retornar null", async () => {
      repositoryMock.getById.mockResolvedValue(null);

      await expect(service.getById(20))
        .rejects
        .toThrow("Produto não registrado")
    })
  })
})
