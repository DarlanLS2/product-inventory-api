import { PasswordEncryptor } from "../utils/PasswordEncryptor.js";
import { User } from "../entities/User.js";
import jwt from "jsonwebtoken"
import { NotFoundError } from "../errors/NotFoundError.js";
import { UserRepository } from "../repositories/userRepository.js";

type reqBody = {
  email: string,
  password: string,
}

export class UserService {
  repository: UserRepository

  constructor(userRepository: UserRepository) {
    this.repository = userRepository;
  }

  async login(body: reqBody): Promise<{token: string}> {
    const user = await this.repository.getByEmail(body.email);

    if (!user) throw new NotFoundError()

    const isPassWordValid = await PasswordEncryptor.check(
      body.password, 
      user.passWordHash
    );
    
    if (!isPassWordValid) throw new NotFoundError()

    const secret = process.env.JWT_SECRET
    
    if (!secret) throw new Error("JWT_SECRET required")

    const token = jwt.sign({ "sub": user.id }, secret, { expiresIn: '1h' })

    return { token: token };
  }

  async register(body: reqBody): Promise<User> {
    const encryptedPassWord = await PasswordEncryptor.encrypt(body.password)

    const user = new User({
      id: "",
      email: body.email,
      passWordHash: encryptedPassWord
    })

    return await this.repository.register(user);
  }

  async delete(body: reqBody): Promise<Number | null> {
    const user = await this.repository.getByEmail(body.email);

    if (!user) throw new NotFoundError()

    const isPassWordValid = await PasswordEncryptor.check(
      body.password, 
      user.passWordHash
    );

    if (!isPassWordValid) return null

    return await this.repository.deleteByEmail(body.email);
  }
}
