import { Product } from "../entities/Product.js"
import { NotFoundError } from "../errors/NotFoundError.js";
import type { ProductRepository } from "../repositories/productRepository.js";

type Fields = {
  name: string,
  price: string,
  quantity: string,
  description: string
}

export class ProductService {
  repository: ProductRepository

  constructor(productRepository: ProductRepository) {
    this.repository = productRepository
  }

  async getAll(): Promise<Product[]> {
    return await this.repository.getAll()
  }

  async getById(id: string | string[] | undefined): Promise<Product> {
      if (!id) throw new Error("No id parameter found")

      const product = await this.repository.getById(id);

      if (!product) throw new NotFoundError()

      return product;
  }

  async register(fields: Fields): Promise<Product> {
    const product = new Product(fields)

    return await this.repository.register(product)
  }

  async update(fields: Fields) {
      const product = new Product(fields);
      const updatedProduct = await this.repository.update(product);

      if (updatedProduct[0] < 1) throw new NotFoundError()

      return updatedProduct
  }

  async delete(id: string | string[] | undefined) {
      if (!id) throw new Error()

      const product = await this.repository.delete(id);

      if (product < 1) throw new NotFoundError()

      return product
  }
}
