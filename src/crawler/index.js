import {
  getPlusSizeCategories,
  getProductsByCategory,
  getProductDetails,
} from '../scraper'
import configs from '../scraper/configs'
import ProductService from '../services/ProductService'

const init = async () => {
  console.log('Crawler started')

  const productService = new ProductService()
  let products = []

  for (const config of configs) {
    const categories = await getPlusSizeCategories(config);

    for (const category of categories) {
      const productsByCategory = await getProductsWithPaginate(category, config, 1, config.maxPage)
      products = [...products, ...productsByCategory]
    }

    for (const product of products) {
      const details = await getProductDetails(product.url, config)
      await productService.save({ ...product, ...details })
    }
  }
  console.log(`Crawle completed. Total of ${products.length} products founded.`)
}

const getProductsWithPaginate = async (category, config, page = 1, maxPage = 10, productsAcc = []) => {
  const url = category.url + config.categoryPageParam + page
  const productsByCategory = await getProductsByCategory(url, category.name, config)

  productsAcc = [...productsAcc, ...productsByCategory]
  page++

  if (page <= maxPage) {
    console.log(category, config, page, maxPage)
    return await getProductsWithPaginate(category, config, page, maxPage, productsAcc)
  }

  return productsAcc
}

export { init }
