import { Product } from "../entities/Product.js"
import type { ProductModel } from "./productModel.js";

export class ProductRepository {
  productModel: ProductModel

  constructor(ProductModel: ProductModel) {
    this.productModel = ProductModel
  }

  async getAll(): Promise<Product[]> {
    const rawProducts = await this.productModel.findAll();
    const products: Product[] = []

    rawProducts.forEach((raw) => {
      let product = new Product({
        id: raw.id,
        name: raw.nome,
        price: raw.preco,
        quantity: raw.quantidade,
        description: raw.descricao
      });

      products.push(product)
    })

    return products
  }

  async getById(id: string | string[]): Promise<Product | null> {
    const product = await this.productModel.findOne({ where: { id: id }});

    if (!product) return null

    return new Product({
      id: product.id,
      name: product.nome,
      price: product.preco,
      quantity: product.quantidade,
      description: product.descricao
    });
  }
  
  async register(product: Product): Promise<Product> {
    const createdProduct = await this.productModel.create({
      nome: product.name,
      preco: product.price,
      quantidade: product.quantity,
      descricao: product.description
    });

    return new Product({
      id: createdProduct.id,
      name: createdProduct.nome,
      price: createdProduct.preco,
      quantity: createdProduct.quantidade,
      description: createdProduct.descricao
    })
  }

  async update(product: Product): Promise<any> {
    return await this.productModel.update(
      {
        nome: product.name,
        preco: product.price,
        quantidade: product.quantity,
        descricao: product.description
      },
      { where: { id: product.id } }
    )
  }

  async delete(id: string): Promise<number> {
    return await this.productModel.destroy({ where: { id: id } })
  }
}
