import type { Request, Response } from "express"
import { Product } from "../entities/Product.js"
import { ValidationError } from "../errors/ValidationError.js"
import { NotFoundError } from "../errors/NotFoundError.js"
import { ProductRepository } from "../repositories/productRepository.js"

export class ProductController {
  repository: ProductRepository

  constructor(productRepository: ProductRepository) {
    this.repository = productRepository
  }

  async getAll(req: Request, res: Response) {
    try {
      const products = await this.repository.getAll();

      res.set('Cache-Control', 'private, max-age=5, must-revalidate')
      res.status(200).json(products)
    } catch (error: any) {
      res.status(500).json({
        title: "Unexpected error",
        detail: error.message,
      })
    }
  }

  async getById(req: Request, res: Response) {
    try {
      if (!req.params.id) throw new Error("No id parameter found")

      const product = await this.repository.getById(req.params.id);

      if (!product) throw new NotFoundError()

      res.set('Cache-Control', 'private, max-age=30, must-revalidate')
      res.status(200).json(product)
    } catch (error: any) {
      if (error instanceof NotFoundError) {
        res.status(404).json({
          title: "Product not found", 
          detail: "No product found with the provided id"
        })
      } else {
        res.status(500).json({
          title: "Unexpected error",
          detail: error.message
        })
      }
    }
  }

  async register(req: Request, res: Response) {
    try {
      const product = new Product(req.body)
      const createdProduct = await this.repository.register(product)

      res.set('Cache-Control', 'no-store')
      res.status(201).json(createdProduct)
    } catch (error: any) {
      if (error instanceof ValidationError) {
        res.status(400).json({
          title: "Invalid input",
          detail: `Invalid ${error.field} format`
        })
      } else {
        res.status(500).json({
          title: "Unexpected error",
          detail: error.message
        })
      }
    }
  }

  async update(req: Request, res: Response) {
    try {
      const product = new Product(req.body);
      const updatedProduct = await this.repository.update(product);

      if (updatedProduct[0] < 1) throw new NotFoundError()

      res.set('Cache-Control', 'no-store');
      res.sendStatus(204);
    } catch (error: any) {
      if (error instanceof ValidationError) {
        res.status(400).json({
          title: "Invalid input",
          detail: `Invalid ${error.field} format`
        })
      } else if (error instanceof NotFoundError) {
        res.status(404).json({
          title: "Product not found", 
          detail: "No product found with the provided id"
        })
      } else {
        res.status(500).json({
          title: "Unexpected error",
          detail: error.message,
        })
      }
    }
  }

  async delete(req: Request, res: Response) {
    try {
      if (!req.params.id) throw new Error()

      const product = await this.repository.delete(req.params.id);

      if (product < 1) throw new NotFoundError()

      res.set('Cache-Control', 'no-store')
      res.sendStatus(204);
    } catch (error: any) {
      if (error instanceof NotFoundError) {
        res.status(404).json({
          title: "Product not found", 
          detail: "No product found with the provided id"
        })
      } else {
        res.status(500).json({
          title: "Unexpected error",
          detail: error.message,
        })
      }
    }
  }
}
