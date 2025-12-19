import { Validator } from "../src/utils/validator.js"

describe("validator", () => {
  describe("isFieldsValid", () => {
    test("deve retornar uma lista de erros quando receber algum campo invalido", () => {
      const fields = {
        name: " name",
        price: "10,201",
        quantity: 10,
        description: "description"
      }

      expect(Validator.isFieldsValid(fields)).toHaveLength(2)
    })
  })

  describe("isNameValid", () => {
    test("deve retornar false quando receber um nome invalido", () => {
      const invalidNames = [" name", "name ", "/name", "name?"]

      invalidNames.forEach((name) => {
        expect(Validator.isNameValid(name)).toBeFalsy()
      })
    })
  })

  describe("isPriceValid", () => {
    test("deve retornar false quando receber um preço invalido", () => {
      const invalidPrices = ["21,112", "12fa", "R$ 10,00", "1.000"];

      invalidPrices.forEach((price) => {
        expect(Validator.isPriceValid(price)).toBeFalsy()
      })
    })
  })

  describe("isQuantityValid", () => {
    test("deve retornar false quando receber uma quantidade invalida", () => {
      const invalidQuantities = ["10.00", "10,12", "dfad2231", -2, 10.001]

      invalidQuantities.forEach((quantity) => {
        expect(Validator.isQuantityValid(quantity)).toBeFalsy()
      })
    })
  })

  describe("isDescriptionValid", () => {
    test("deve retornar false quando receber uma descrição invalida", () => {
      const invalidDescriptions = ["  ", "", "<script></script>"]

      invalidDescriptions.forEach((description) => {
        expect(Validator.isDescriptionValid(description)).toBeFalsy();
      })
    })
  })
})
