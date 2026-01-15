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
      throw new ValidationError("name", "required");
    }

    if (!regex.test(name)) {
      throw new ValidationError("name", "invalid_format");
    }
  }

  #validatePrice(price) {
    const regex = /^(0|[1-9]\d*)(,\d{1,2})?$/;

    if (price == null) {
      throw new ValidationError("price", "required");
    } 

    if (!regex.test(price)) {
      throw new ValidationError("price", "invalid_format");
    }
  }

  
  #validateQuantity(quantity) {
    const regex = /^(0|[1-9]\d*)$/;

    if (quantity == null) {
      throw new ValidationError("quantity", "required");
    } 

    if (!regex.test(quantity)) {
      throw new ValidationError("quantity", "invalid_format");
    }
  }

  #validateDescription(description) {
    const regex = /^(?=.{10,500}$)(?!\s*$)[A-Za-z0-9À-ÖØ-öø-ÿ\s.,;:!?()'"%\-_/]+$/

    if (description == null) {
      throw new ValidationError("description", "required");
    }

    if (!regex.test(description)) {
      throw new ValidationError("description", "invalid_format")
    }
  }
}
