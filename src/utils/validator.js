export class Validator {
  static isFieldsValid(fields) {
    const errors = [];

    if (!this.isNameValid(fields.name)) {
      errors.push({ field: "name", message: "Nome do produto inválido" });
    }

    if (!this.isPriceValid(fields.price)) {
      errors.push({ field: "price", message: "Preço inválido" });
    }

    if (!this.isQuantityValid(fields.quantity)) {
      errors.push({ field: "quantity", message: "Quantidade inválida" });
    }

    if (!this.isDescriptionValid(fields.description)) {
      errors.push({ field: "description", message: "Descrição inválida" });
    }

    return errors
  }

  static isNameValid(name) {
    const regex = /^(?=.{3,100}$)[A-Za-z0-9À-ÖØ-öø-ÿ]+(?:[ _-][A-Za-z0-9À-ÖØ-öø-ÿ]+)*$/;

    return regex.test(name)
  }

  static isPriceValid(price) {
    const regex = /^(0|[1-9]\d*)(,\d{1,2})?$/;

    return regex.test(price)
  }

  static isQuantityValid(quantity) {
    const regex = /^(0|[1-9]\d*)$/;

    return regex.test(quantity)
  }

  static isDescriptionValid(description) {
    const regex = /^(?=.{10,500}$)(?!\s*$)[A-Za-z0-9À-ÖØ-öø-ÿ\s.,;:!?()'"%\-_/]+$/
    
    return regex.test(description)
  }
}
