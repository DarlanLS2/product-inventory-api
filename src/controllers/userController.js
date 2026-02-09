import { NotFoundError } from "../errors/NotFoundError.js"
import { ValidationError } from "../errors/ValidationError.js"

export class UserController {
  constructor(UserService) {
    this.service = UserService
  }

  async login(req, res) {
    try {
      const user = await this.service.login(req.body)

      res.status(200).json(user)
    } catch (error) {
      if (error instanceof ValidationError) {
        res.status(400).json({
          title: "Invalid input", 
          detail: "Email or password format is invalid"
        })
      } else if (error instanceof NotFoundError) {
        res.status(404).json({
          title: "User not found", 
          detail: "No user found with the provided email"
        })
      } else {
        res.status(500).json({
          title: "Unexpected error",
          detail: error.message
        })
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
        res.status(400).json({
          title: "Invalid input", 
          detail: `Invalid ${error.field} format`
        })
      } else if (error.name == "SequelizeUniqueConstraintError") {
        res.status(409).json({
          title: "Email in use" ,
          detail: "The provided email is already in use" 
        })
      } else {
        res.status(500).json({
          title: "Unexpected error",
          detail: error.message
        })
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
      res.sendStatus(204);
    } catch (error) {
      if (error instanceof ValidationError) {
        res.status(400).json({ field: "email or passWord", message: "invalid"})
      } else {
        res.status(500).json({ error: error.message })
      }
    }
  }
}
