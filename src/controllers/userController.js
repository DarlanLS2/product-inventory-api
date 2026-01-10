import { ValidationError } from "../errors/ValidationError.js"
import { NotFoundError } from "../errors/NotFoundError.js"

export class UserController {
  constructor(UserService) {
    this.service = UserService
  }
  async getByEmail(req, res) {
    try {
      const user = await this.service.getByEmail(req.params.email);

      if (user == null) {
        throw new NotFoundError("Usuario não encontrado")
      }

      res.set('Cache-Control', 'private, max-age=30, must-revalidate')
      res.status(200).json(user)
    } catch (error) {
      if (error instanceof NotFoundError) {
        res.status(400).send({error: error.message})
      } else {
        res.status(500).send({error: error.message})
      }
    }
  }

  async register(req, res) {
    try {
      const createdUser = await this.service.register(req.body)

      res.set('Cache-Control', 'no-store')
      res.status(201).send({
        message: "Usuario cadastrado com sucesso",
        user: createdUser
      })
    } catch (error) {
      if (error instanceof ValidationError) {
        res.status(400).send({error: error.message})
      } else {
        res.status(500).send({error: error.message})
      }
    }
  }

  async delete(req, res) {
    try {
      const user = await this.service.delete(req.params.id);

      if (user < 1) {
        throw new NotFoundError("Usuario não encontrado")
      }

      res.set('Cache-Control', 'no-store')
      res.status(204);
      res.end();
    } catch (error) {
      if (error instanceof NotFoundError) {
        res.status(400).send({error: error.message})
      } else {
        res.status(500).send({error: error.message})
      }
    }
  }
}
