import { Product } from "../entities/Product.js"

export class ProductRepository {
  constructor(ProductModel) {
    this.productModel = ProductModel
  }

  async getAll() {
    const allProducts = await this.productModel.findAll();
    const products = []

    allProducts.forEach((element) => {
      let product = new Product({
        id: element.id,
        name: element.nome,
        price: element.preco,
        quantity: element.quantidade,
        description: element.descricao
      });

      products.push(product)
    })

    return products
  }

  async getById(id) {
    const product = await this.productModel.findOne({ where: { id: id }});

    if (!product) {
      return null
    }

    return new Product({
      id: product.id,
      name: product.nome,
      price: product.preco,
      quantity: product.quantidade,
      description: product.descricao
    });
  }
  
  async register(product) {
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

  async update(product) {
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

  async delete(id) {
    return await this.productModel.destroy({where: {id: id}})
  }
}
