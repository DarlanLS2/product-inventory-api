import { Product } from "../../src/entities/Product.js";
import { ValidationError } from "../../src/errors/ValidationError.js";

let validName = "rice"
let validPrice = "20,10"
let validQuantity = "10"
let validDescription = "a long description"

describe("field validation", () => {
  it("throws ValidationError when name is invalid", () => {
    const names = [
      null,
      "",
      "s",
      "ss",
      "dsdfafdsaddsdfafdsaddsdfafdsaddsdfafdsaddsdfafdsaddsdfafdsaddsdfafdsaddsdfafdsaddsdfafdsaddsdfafdsada"
    ]

    names.forEach((name) => {
      expect(() => {
        new Product({
          name: name,
          price: validPrice,
          quantity: validQuantity,
          description: validDescription
        })
      }).toThrow(ValidationError)
    })
  })

  it("throws ValidationError when price is invalid", () => {
    const prices = [
      null,
      "10,000",
      "10.00",
      "01,12",
    ]

    prices.forEach((price) => {
      expect(() => {
        new Product({
          name: validName,
          price: price,
          quantity: validQuantity,
          description: validDescription
        })
      }).toThrow(ValidationError)
    })
  })

  it("throws ValidationError when quantity is invalid", () => {
    const quantities = [
      null,
      "01",
      "10,000",
      "10.00",
      "01,12",
    ]

    quantities.forEach((quantity) => {
      expect(() => {
        new Product({
          name: validName,
          price: validPrice,
          quantity: quantity,
          description: validDescription
        })
      }).toThrow(ValidationError)
    })
  })

  it("throws ValidationError when description is invalid", () => {
    const descriptions = [
      null,
      "short",
      "longlonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglong"
    ]

    descriptions.forEach((description) => {
      expect(() => {
        new Product({
          name: validName,
          price: validPrice,
          quantity: validQuantity,
          description: description
        })
      }).toThrow(ValidationError)
    })
  })
})
