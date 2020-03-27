import {
  getPlusSizeCategories,
  getProductsByCategory,
  getProductDetails,
} from '../scraper'
import configs from '../scraper/configs'
import ProductService from '../services/ProductService'
import logger from '../log'

const init = async () => {
  logger.info('Crawler started at', new Date())
  const productService = new ProductService()

  for (const config of configs) {
    let products = []
    let categories = await getPlusSizeCategories(config);

    logger.info(`\nFounded ${categories.length} categories from site ${config.initialUrl}`)

    for (const category of categories) {
      let productsByCategory = await getProductsWithPaginate(category, config, 1, config.maxPage)
      products = [...products, ...productsByCategory]
      logger.info(`Founded ${productsByCategory.length} products from category ${category.name}`)
    }

    for (const product of products) {
      const details = await getProductDetails(product.url, config)
      await productService.save({ ...product, ...details })
    }

    logger.info(`Total of ${products.length} products crawleds from site ${config.initialUrl}`)
  }

  logger.info('Crawle completed.')
}

const getProductsWithPaginate = async (category, config, page = 1, maxPage = 10, productsAcc = []) => {
  const url = category.url + config.categoryPageParam + page
  const productsByCategory = await getProductsByCategory(url, category.name, config)

  productsAcc = [...productsAcc, ...productsByCategory]
  page++

  if (page <= maxPage) {
    return await getProductsWithPaginate(category, config, page, maxPage, productsAcc)
  }

  return productsAcc
}

export { init }
