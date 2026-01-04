export class ProductRepository {
  constructor(ProductModel) {
    this.productModel = ProductModel
  }

  async getAll() {
    try {
      return await this.productModel.findAll();
    } catch {
      throw new Error("Erro ao acessar o banco");
    }
  }

  async getById(id) {
    try{
      return await this.productModel.findOne({ where: {id: id}});
    } catch {
      throw new Error("Erro ao acessar o banco");
    }
  }
  
  async register(product) {
    try {
      return await this.productModel.create({
        nome: product.name,
        preco: product.price,
        quantidade: product.quantity,
        descricao: product.description
      });
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
