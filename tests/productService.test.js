import  { ProductService } from "../src/services/productService.js"

describe("ProductService", () => {
  let repositoryMock;
  let service;

  beforeEach(() => {
    repositoryMock = {
      getAll: jest.fn()
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

    test("deve lançar erro de dominio quando repository retornar erro tecnico", async () => {
      repositoryMock.getAll.mockRejectedValue(new Error("erro ao acessar o banco"))

      await expect(service.getAll())
        .rejects
        .toThrow("Erro ao buscar produtos")
    })
  })
})
