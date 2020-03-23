import cheerio from 'cheerio'
import { httpHelper } from '../helpers'
import ClothesCrawlerService from '../services/ClothesCrawlerService'

class ProductController {
  constructor() {
    this.crawlerService = new ClothesCrawlerService('blusas')
    this.crawlerService.start()
    this.crawlerService.onFetchcomplete((content) => {
      const $ = cheerio.load(content)
      $('.ProductItem .ProductImageContent').each((_i, element) => {
        console.log(
          'ProductImageContent',
          $(element).find('a img').attr('data-original')
        )
      })
    })
  }

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
