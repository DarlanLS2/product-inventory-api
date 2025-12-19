export class ProductService {
  constructor(productRepository) {
    this.repository = productRepository;
  }
  async getAll() {
      const res = await this.repository.getAll();

      if (res.length === 0) {
        throw new Error("Não há produtos")
      }

      return res
  }

  async getById(id) {
    await this.repository.getById(id);
  }

  async register(infos) {
    await this.repository.register(infos)
  }
  
  async update(infos) {
    await this.repository.update(infos);
  }

  async delete(id) {
    await this.repository.delete(id);
  }
}
