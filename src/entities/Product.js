import { ValidationError } from "../errors/ValidationError.js"

export class Product {
  constructor(fields) {
    this.#validateName(fields.name);
    this.#validatePrice(fields.price);
    this.#validateQuantity(fields.quantity);
    this.#validateDescription(fields.description);

    if (fields.id == null) {
      this.id = null;
    } else {
      this.id = fields.id;
    }
    this.name = fields.name;
    this.price = fields.price;
    this.quantity = fields.quantity;
    this.description = fields.description;
  }

  #validateName(name) {
    const regex = /^(?=.{3,100}$)[A-Za-z0-9À-ÖØ-öø-ÿ]+(?:[ _-][A-Za-z0-9À-ÖØ-öø-ÿ]+)*$/;

    if (name == null) {
      throw new ValidationError("Nome invalido");
    }

    if (!regex.test(name)) {
      throw new ValidationError("Nome invalido");
    }
  }

  #validatePrice(price) {
    const regex = /^(0|[1-9]\d*)(,\d{1,2})?$/;

    if (price == null) {
      throw new ValidationError("Preço invalido");
    } 

    if (!regex.test(price)) {
      throw new ValidationError("Preço invalido");
    }
  }

  
  #validateQuantity(quantity) {
    const regex = /^(0|[1-9]\d*)$/;

    if (quantity == null) {
      throw new ValidationError("Quantidade invalida");
    } 

    if (!regex.test(quantity)) {
      throw new ValidationError("Quantidade invalida");
    }
  }

  #validateDescription(description) {
    const regex = /^(?=.{10,500}$)(?!\s*$)[A-Za-z0-9À-ÖØ-öø-ÿ\s.,;:!?()'"%\-_/]+$/

    if (description == null) {
      throw new ValidationError("Descrição invalida");
    }

    if (!regex.test(description)) {
      throw new ValidationError("Descrição invalida")
    }
  }
}
