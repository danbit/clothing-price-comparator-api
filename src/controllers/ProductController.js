import { httpHelper } from '../helpers'

class ProductController {
  // GET /products
  async getAll(_req, res) {
    httpHelper.responseSuccess(res, [])
  }
}

export default new ProductController()
