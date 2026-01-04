import { ProductInputValidator } from "../utils/productInputValidator.js"

export class ProductController {
  constructor(productRepository) {
    this.repository = productRepository
  }

  async getAll(req, res) {
    try {
      let productsData = await this.repository.getAll();
      res.status(200).json(productsData)
    } catch(erro) {
      res.status(500).send({error: erro.message})
    }
  }

  async getById(req, res) {
    try {
      let productData = await this.repository.getById(req.params.id);
      res.status(200).json(productData)
    } catch (err) {
      res.status(500).send({erro: err})
    }
  }

  async register(req, res) {
    try {
      const invalidFields = ProductInputValidator.isFieldsValid(req.body)

      if (invalidFields.length > 0) {
        return res.status(400).send({
          erro: "Campo invalido",
          invalidFields: invalidFields
        })
      }

      await this.repository.register(req.body)
      res.status(200).send({message: "Produto registrado com sucesso"})
    } catch (err) {
      res.status(500).send({erro: err})
    }
  }

  async update(req, res) {
    try {
      await this.repository.update(req.body);
      res.status(200).send({message: "Product atualizado com sucesso"})
    } catch (err) {
      res.status(500).send({erro: err})
    }
  }

  async delete(req, res) {
    try {
      await this.repository.delete(req.params.id);
      res.status(200).send({message: "Produto excluido com sucesso"});
    } catch (erro) {
      res.status(500).send({erro: erro.message})
    }
  }
}
