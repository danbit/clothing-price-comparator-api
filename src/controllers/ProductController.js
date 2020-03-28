import { httpHelper } from '../helpers'
import ProductService from '../services/ProductService'

class ProductController {
  constructor() {
    this.productService = new ProductService()
  }

  async getByCategory(_req, res, query) {
    let products = []
    try {
      products = await this.productService.findByCategory(query.category)
      return httpHelper.responseSuccess(res, products)
    } catch (error) {
      return httpHelper.responseError(res, error)
    }
  }
}

export default new ProductController()
