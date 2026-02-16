import bcrypt from "bcrypt";

export class PasswordEncryptor {
  static async encrypt(passWord: string) {
    return await bcrypt.hash(passWord, 10)
  }

  static async check(rawPassWord: string, hash: string) {
    return await bcrypt.compare(rawPassWord, hash);
  }
}


