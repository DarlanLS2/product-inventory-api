import { Product } from "../entities/Product.js"

export class ProductRepository {
  constructor(ProductModel) {
    this.productModel = ProductModel
  }

  async getAll() {
    try {
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
    } catch {
      throw new Error("Erro ao acessar o banco");
    }
  }

  async getById(id) {
    try{
      const product = await this.productModel.findOne({ where: {id: id}});

      return new Product({
        id: product.id,
        name: product.nome,
        price: product.preco,
        quantity: product.quantidade,
        description: product.descricao
      });
    } catch {
      throw new Error("Erro ao acessar o banco");
    }
  }
  
  async register(product) {
    try {
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
    } catch {
      throw new Error("Erro ao acessar o banco");
    }
  }

  async update(product) {
    try {
      return await this.productModel.update(
        {
          nome: product.name,
          preco: product.price,
          quantidade: product.quantity,
          descricao: product.description
        },
        { where: { id: product.id } }
      )
    } catch {
      throw new Error("Erro ao acessar o banco")
    }
  }

  async delete(id) {
    try {
      return await this.productModel.destroy({where: {id: id}})
    } catch {
      throw new Error("Erro ao acessar o banco")
    }
  }
}
