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
      const productsByCategory = await getProductsByCategory(category, config)
      products = [...products, ...productsByCategory]
    }

    for (const product of products) {
      const details = await getProductDetails(product.url, config)
      await productService.save({ ...product, ...details })
    }

  }
  console.log(`Crawle completed. Total of ${products.length} products founded.`)
}

export { init }
