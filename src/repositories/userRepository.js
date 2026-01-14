import { User } from "../entities/User.js";

export class UserRepository {
  constructor(UserModel) {
    this.userModel = UserModel
  }

  async getByEmail(email) {
    try{
      const user = await this.userModel.findOne({ where: {email: email}});

      return new User({
        id: user.id,
        email: user.email,
        passWordHash: user.passWordHash
      });
    } catch {
      throw new Error("Erro ao acessar o banco");
    }
  }
  
  async register(user) {
    try {
      const createdUser = await this.userModel.create({
        email: user.email,
        passWordHash: user.passWordHash
      });

      return new User({
        id: createdUser.id,
        email: createdUser.email,
        passWordHash: createdUser.passWordHash
      })
    } catch (error) {
      throw new Error("Erro ao acessar o banco");
    }
  }

  async delete(id) {
    try {
      return await this.userModel.destroy({where: {id: id}})
    } catch {
      throw new Error("Erro ao acessar o banco")
    }
  }
}
