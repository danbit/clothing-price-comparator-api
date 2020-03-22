import { httpHelper } from '../helpers'

class ProductController {
  // GET /products
  async getAll(_req, res) {
    const productsMock = [
      {
        name: 'Product ABC',
        description: 'Description for Product A',
        price: 0.99,
        url: 'http://site.com/plus-size/product-a',
        image: 'http://cdn.site.com/assets/images/plus-size/product-a.png',
        category: 'Dress',
        size: 'GG',
      },
    ]

    return httpHelper.responseSuccess(res, productsMock)
  }
}

export default new ProductController()
