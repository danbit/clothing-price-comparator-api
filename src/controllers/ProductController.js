import cheerio from 'cheerio'
import ClothesCrawlerService from '../services/ClothesCrawlerService'
import { responseSuccess, responseError } from '../helpers/httpHelper'

class ProductController {
  constructor() {
    this.crawlerService = new ClothesCrawlerService('blusas')
  }

  // GET /products
  async getAll(_req, res, query) {
    const { category } = query
    this.crawlerService.start()
    const products = []

    this.crawlerService.onFetchcomplete((content) => {
      const $ = cheerio.load(content)
      $('.ProductItem').each(() => {
        const productItem = $(this)
        const productDetails = productItem.find('.ProductDetails h2 a')
        const name = productDetails.text()
        const url = productDetails.attr('href')

        const image = productItem
          .find('.ProductImageContent a img')
          .attr('data-original')
        const price = productItem
          .find('.ProductPrices .prod_valor .prod_valor_preco .ValorProduto')
          .text()

        const sizes = []
        productItem
          .find(
            '.onHover.t-store .productVariations .options.option_tamanho li'
          )
          .each(() => {
            const size = $(this).attr('title')
            sizes.push(size)
          })

        //TODO get description
        products.push({ name, description: name, price, url, image, category, sizes })
      })
      responseSuccess(res, products)
    })

    this.crawlerService.onFetchError((statusCode) => {
      responseError(res, new Error(`Fetch error with statu: ${statusCode}`))
    })
  }
}

export default new ProductController()
