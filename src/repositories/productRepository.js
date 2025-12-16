export class ProductRepository {
  constructor(Product) {
    this.Product = Product
  }

  async getAll() {
    try {
      return await this.Product.findAll();
    } catch {
      throw new Error("Erro na requisição do findAll()");
    }
  }

  async getById(id) {
    try{
      return await this.Product.findOne({ where: {id: id}});
    } catch {
      throw new Error("Erro na requisição findOne()");
    }
  }
  
  async register(infos) {
    let isCreated = await this.Product.create({
      nome: infos.name,
      preco: infos.price,
      quantidade: infos.quantity,
      descricao: infos.description
    });

    if (!isCreated) {
      throw new Error("Erro na requisição create()");
    }
  }

  async update(infos) {
    try {
      await this.Product.update(
        {
          nome: infos.name,
          preco: infos.price,
          quantidade: infos.quantity,
          descricao: infos.description
        },
        { where: { id: infos.id } }
      )
    } catch {
      throw new Error("Erro na requisição update()")
    }
  }

  async delete(id) {
    let isDeleted = await this.Product.destroy({where: {id: id}})

    if (isDeleted == 0) {
      throw new Error("Erro na requisição destroy()");
    }
  }
}
