import { Product } from "../entities/Product.js"

export class ProductController {
  constructor(productRepository) {
    this.repository = productRepository
  }

  async getAll(req, res) {
    try {
      let productsData = await this.repository.getAll();
      res.status(200).json(productsData)
    } catch(err) {
      res.status(500).send({error: err.message})
    }
  }

  async getById(req, res) {
    try {
      let productData = await this.repository.getById(req.params.id);
      res.status(200).json(productData)
    } catch (err) {
      res.status(500).send({erro: err.message})
    }
  }

  async register(req, res) {
    try {
      const product = new Product(req.body)

      await this.repository.register(product)
      res.status(200).send({message: "Produto registrado com sucesso"})
    } catch (err) {
      res.status(500).send({erro: err.message})
    }
  }

  async update(req, res) {
    try {
      const product = new Product(req.body);
      product.setId(req.body.id);

      await this.repository.update(product);
      res.status(200).send({message: "Producto atualizado com sucesso"})
    } catch (err) {
      res.status(500).send({erro: err.message})
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
