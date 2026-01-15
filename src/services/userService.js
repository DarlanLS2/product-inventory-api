import { PassWordEncryptor } from "../utils/PassWordEncryptor.js";
import { User } from "../entities/User.js";
import jwt from "jsonwebtoken"

export class UserService {
  constructor(userRepository) {
    this.repository = userRepository;
  }

  async login(body) {
    const user = await this.repository.getByEmail(body.email);
    const isPassWordValid = await PassWordEncryptor.check(
      body.passWord, 
      user.passWordHash
    );
    
    if (!isPassWordValid) {
      return null
    }

    const token = jwt.sign(
      { "sub": user.id },
      process.env.JWT_SECRET, 
      { expiresIn: '1h' }
    )

    return { token: token };
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

  async delete(body) {
    const user = await this.repository.getByEmail(body.email);
    const isPassWordValid = await PassWordEncryptor.check(
      body.passWord, 
      user.passWordHash
    );

    if (!isPassWordValid) {
      return null
    }

    return await this.repository.deleteByEmail(body.email);
  }
}
