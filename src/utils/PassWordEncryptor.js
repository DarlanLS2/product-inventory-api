import bcrypt from "bcrypt";

export class PassWordEncryptor {
  static async encrypt(passWord) {
    return await bcrypt.hash(passWord, 10)
  }

  static async check(rawPassWord, hash) {
    return await bcrypt.compare(rawPassWord, hash);
  }
}


