import { ValidationError } from "../errors/ValidationError.js";

type Fields = {
  id?: string | number
  email: string,
  passWordHash: string
}

export class User {
  id: string | number | undefined
  email: string
  passWordHash: string

  constructor(fields: Fields) {
    this.#validateEmail(fields.email);

    this.id = fields.id;
    this.email = fields.email;
    this.passWordHash = fields.passWordHash;
  }

  #validateEmail(email: string) {
    const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (!regex.test(email)) {
      throw new ValidationError("email", "invalid_format");
    }
  }
}
