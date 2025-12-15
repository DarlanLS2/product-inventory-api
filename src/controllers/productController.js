export class ProductController {
  constructor(productService) {
    this.service = productService
  }

  async getAll(req, res) {
    try {
      let productsData = await this.service.getAll();
      res.status(200).json(productsData)
    } catch(erro) {
      res.status(500).send({error: erro.message})
    }
  }

  async getById(req, res) {
    try {
      let productData = await this.service.getById(req.params.id);
      res.status(200).json(productData)
    } catch (err) {
      res.status(500).send({erro: err})
    }
  }

  async register(req, res) {
    try {
      await this.service.register(req.body)
      res.status(200).send({message: "Produto registrado com sucesso"})
    } catch (err) {
      res.status(500).send({erro: err})
    }
  }

  async update(req, res) {
    try {
      await this.service.update(req.body);
      res.status(200).send({message: "Product atualizado com sucesso"})
    } catch (err) {
      res.status(500).send({erro: err})
    }
  }

  async delete(req, res) {
    try {
      await this.service.delete(req.params.id);
      res.status(200).send({message: "Produto excluido com sucesso"});
    } catch (erro) {
      res.status(500).send({erro: erro.message})
    }
  }
}
