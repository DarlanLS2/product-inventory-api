export class ProductService {
  constructor(productRepository) {
    this.repository = productRepository;
  }
  async getAll() {
    return await this.repository.getAll();
  }

  async getById(id) {
    return await this.repository.getById(id);
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
