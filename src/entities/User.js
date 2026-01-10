export class User {
  constructor(fields) {
    this.#validateEmail(fields.email);

    this.email = fields.email;
    this.passWordHash = fields.passWordHash;
  }

  #validateEmail(email) {
    const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (email == null) {
      throw new ValidationError("Email invalido");
    }

    if (!regex.test(email)) {
      throw new ValidationError("Email invalido");
    }
  }
}
