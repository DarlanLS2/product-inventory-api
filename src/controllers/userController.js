import { ValidationError } from "../errors/ValidationError.js"
import { NotFoundError } from "../errors/NotFoundError.js"

export class UserController {
  constructor(UserService) {
    this.service = UserService
  }

  async login(req, res) {
    try {
      const user = await this.service.login(req.body)

      if (user == null) throw new ValidationError() 

      res.status(200).send(user)
    } catch (error) {
      if (error instanceof ValidationError) {
        res.status(400).send({ field: "email or passWord", message: "invalid"})
      } else {
        res.status(500).send({ error: error.message })
      }
    }
  }

  async register(req, res) {
    try {
      const createdUser = await this.service.register(req.body)

      res.set('Cache-Control', 'no-store')
      res.status(201).json({
        id: createdUser.id,
        email: createdUser.email,
        passWord: req.body.passWord
      })
    } catch (error) {
      if (error instanceof ValidationError) {
        res.status(400).send({ field: error.field, message: error.message })
      } else {
        res.status(500).send({error: error.message})
      }
    }
  }

  async delete(req, res) {
    try {
      const user = await this.service.delete(req.body);

      if (user == null) {
        throw new ValidationError()
      }

      res.set('Cache-Control', 'no-store')
      res.status(204);
      res.end();
    } catch (error) {
      if (error instanceof ValidationError) {
        res.status(400).send({ field: "email or passWord", message: "invalid"})
      } else {
        res.status(500).send({error: error.message})
      }
    }
  }
}
