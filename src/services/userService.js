import { PassWordEncryptor } from "../utils/PassWordEncryptor.js";
import { User } from "../entities/User.js";

export class UserService {
  constructor(userRepository) {
    this.repository = userRepository;
  }

  async getByEmail(email) {
    return await this.repository.getByEmail(email);
  }

  async login(body) {
    const user = this.repository.getByEmail(body.email);
    const isValid = PassWordEncryptor.check(body.passWord, user.passWordHash);
    const mockToken = "asfafa311241hsda2341"
    
    if (isValid) {
      return mockToken;
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
