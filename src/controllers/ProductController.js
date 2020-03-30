import url from 'url'
import { httpHelper } from '../helpers'
import ProductService from '../services/ProductService'

class ProductController {
  constructor() {
    this.productService = new ProductService()
  }

  async getByCategory(req, res) {
    let products = []
    try {
      const { query } = url.parse(req.url, true)

      const { category, page, size } = query
      products = await this.productService.findByCategory(category, page, size)
      return httpHelper.responseSuccess(res, products)
    } catch (error) {
      return httpHelper.responseError(res, error)
    }
  }
}

export default new ProductController()
