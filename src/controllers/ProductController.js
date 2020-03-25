import { responseSuccess, responseError } from '../helpers/httpHelper'

class ProductController {
  // GET /products
  async getAll(_req, res) {
    responseSuccess(res, [])
  }
}

export default new ProductController()
