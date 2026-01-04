export class Product {
  constructor(fields) {
    this.#validateName(fields.name);
    this.#validatePrice(fields.price);
    this.#validateQuantity(fields.quantity);
    this.#validateDescription(fields.description);

    this.id = null
    this.name = fields.name;
    this.price = fields.price;
    this.quantity = fields.quantity;
    this.description = fields.description;
  }

  setId(id) {
    this.id = id;
  }

  #validateName(name) {
    const regex = /^(?=.{3,100}$)[A-Za-z0-9À-ÖØ-öø-ÿ]+(?:[ _-][A-Za-z0-9À-ÖØ-öø-ÿ]+)*$/;

    if (name == null) {
      throw new Error("Nome invalido");
    }

    if (regex.test(name)) {
      throw new Error("Nome invalido");
    }
  }

  #validatePrice(price) {
    const regex = /^(0|[1-9]\d*)(,\d{1,2})?$/;

    if (price == null) {
      throw new Error("Preço invalido");
    } 

    if (regex.test(price)) {
      throw new Error("Preço invalido");
    }
  }

  
  #validateQuantity(quantity) {
    const regex = /^(0|[1-9]\d*)$/;

    if (quantity == null) {
      throw new Error("Quantidade invalida");
    } 

    if (regex.test(quantity)) {
      throw new Error("Quantidade invalida");
    }
  }

  #validateDescription(description) {
    const regex = /^(?=.{10,500}$)(?!\s*$)[A-Za-z0-9À-ÖØ-öø-ÿ\s.,;:!?()'"%\-_/]+$/

    if (description == null) {
      throw new Error("Descrição invalida");
    }

    if (regex.test(description)) {
      throw new Error("Descrição invalida")
    }
  }
}
