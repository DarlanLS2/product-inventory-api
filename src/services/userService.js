import { PassWordEncryptor } from "../utils/PassWordEncryptor.js";
import { User } from "../entities/User.js";
import jwt from "jsonwebtoken"

export class UserService {
  constructor(userRepository) {
    this.repository = userRepository;
  }

  async login(body) {
    const user = await this.repository.getByEmail(body.email);
    const isPassWordValid = await PassWordEncryptor.check(body.passWord, user.passWordHash);
    const token = jwt.sign({ id: user.id }, "segredo_mockado", { expiresIn: '1h' })
    
    if (isPassWordValid) {
      return {
        id: user.id,
        email: user.email,
        passWord: body.passWord,
        token: token
      };
    } else {
      return null
    }
  }

  async register(body) {
    const encryptedPassWord = await PassWordEncryptor.encrypt(body.passWord)

    const user = new User({
      id: null,
      email: body.email,
      passWordHash: encryptedPassWord
    })

    return await this.repository.register(user);
  }

  async delete(id) {
    return await this.repository.delete(id);
  }
}
