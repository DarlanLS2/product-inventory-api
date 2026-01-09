import { Product } from "../entities/Product.js"
import { ValidationError } from "../errors/ValidationError.js"
import { NotFoundError } from "../errors/NotFoundError.js"

export class ProductController {
  constructor(productRepository) {
    this.repository = productRepository
  }

  async getAll(req, res) {
    try {
      const products = await this.repository.getAll();

      if (products.leght < 1) {
        throw new NotFoundError("Não há produtos cadastrados")
      }

      res.set('Cache-Control', 'private, max-age=5, must-revalidate')
      res.status(200).json(products)
    } catch(error) {
      if (error instanceof NotFoundError) {
        res.status(400).send({error: error.message})
      } else {
        res.status(500).send({error: error.message})
      }
    }
  }

  async getById(req, res) {
    try {
      const product = await this.repository.getById(req.params.id);

      if (product == null) {
        throw new NotFoundError("Produto não encontrado")
      }

      res.set('Cache-Control', 'private, max-age=30, must-revalidate')
      res.status(200).json(product)
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
      const product = new Product(req.body)
      const createdProduct = await this.repository.register(product)

      res.set('Cache-Control', 'no-store')
      res.status(201).send({
        message: "Produto criado com sucesso",
        product: createdProduct
      })
    } catch (error) {
      if (error instanceof ValidationError) {
        res.status(400).send({error: error.message})
      } else {
        res.status(500).send({error: error.message})
      }
    }
  }

  async update(req, res) {
    try {
      const product = new Product(req.body);
      const updatedProduct = await this.repository.update(product);

      if (updatedProduct[0] < 1) {
        throw new NotFoundError("Produto não encontrado")
      }

      res.set('Cache-Control', 'no-store');
      res.status(204);
      res.end();
    } catch (error) {
      if (error instanceof ValidationError) {
        res.status(400).send({error: error.message})
      } else if (error instanceof NotFoundError) {
        res.status(400).send({error: error.message})
      } else {
        res.status(500).send({error: error.message})
      }
    }
  }

  async delete(req, res) {
    try {
      const product = await this.repository.delete(req.params.id);

      if (product < 1) {
        throw new NotFoundError("Produto não encontrado")
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
