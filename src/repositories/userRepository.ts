import { User } from "../entities/User.js";
import type { UserModel } from "./UserModel.js"

export class UserRepository {
  userModel: UserModel

  constructor(UserModel: UserModel) {
    this.userModel = UserModel
  }

  async getByEmail(email: string): Promise<User | null> {
    const user = await this.userModel.findOne({ where: { email: email }});

    if (!user) return null

    return new User({
      id: user.id,
      email: user.email,
      passWordHash: user.passWordHash
    });
  }

  async register(user: User): Promise<User> {
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

  async deleteByEmail(email: string): Promise<number> {
    return await this.userModel.destroy({ where: { email: email }})
  }
}
