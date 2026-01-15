import { User } from "../entities/User.js";
import { ValidationError } from "../errors/ValidationError.js";

export class UserRepository {
  constructor(UserModel) {
    this.userModel = UserModel
  }

  async getByEmail(email) {
    const user = await this.userModel.findOne({ where: { email: email }});

    if (user == null) {
      return null
    }

    return new User({
      id: user.id,
      email: user.email,
      passWordHash: user.passWordHash
    });
  }

  async register(user) {
    const createdUser = await this.userModel.create({
      email: user.email,
      passWordHash: user.passWordHash
    });

    return new User({
      id: createdUser.id,
      email: createdUser.email,
      passWordHash: createdUser.passWordHash
    })
  }

  async deleteByEmail(email) {
    try {
      return await this.userModel.destroy({ where: { email: email }})
    } catch {
      throw new Error("Erro ao acessar o banco")
    }
  }
}
