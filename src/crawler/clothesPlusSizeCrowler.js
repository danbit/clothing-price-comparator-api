import promisePool from 'tiny-promise-pool'
import {
  getPlusSizeCategories,
  getProductsByCategory,
  getProductDetails,
} from '../scraper'
import configs from '../scraper/configs'
import ProductService from '../services/ProductService'
import logger from '../log'

const init = async (totalProducts) => {
  try {
    logger.info('Crawler started at', new Date())
    const productService = new ProductService()

    for (const config of configs) {
      let products = []
      let completedProducts = []

      let categories = await getPlusSizeCategories(config);
      logger.info(`\nFounded ${categories.length} categories from site ${config.initialUrl}`)

      products = await getProductsFromCategories(categories, config)

      logger.info('Geting all products details')
      completedProducts = await getAllProductDetails(products, config)

      if (totalProducts && totalProducts === 0) {
        await productService.insertMany(completedProducts)
      } else {
        for (const product of completedProducts) {
          await productService.saveOrUpdate(product)
        }
      }

      logger.info(`Total of ${products.length} products crawleds from site ${config.initialUrl}`)
    }

    logger.info('Crawle complete at', new Date())

  } catch (error) {
    logger.error('Error on clothesPlusSizeCrowler', error)
    throw error
  }

}

const getProductsFromCategories = (categories, config) =>
  new Promise((resolve, reject) => {
    const productsPool = promisePool({
      threads: 3,
      promises: ({ index, data }) => {
        if (index >= data.length) return null

        const category = data[index]
        return getProductsWithPaginate(category, config, 1, config.maxPage)
      },
      context_data: categories
    })

    productsPool.then((results) => {
      const products = results.reduce((prevVal, elem) => {
        if (!prevVal) return elem.result
        return [...prevVal, ...elem.result];
      }, null)
      resolve(products)
    }).catch((error) => {
      reject(error)
    })
  })

const getProductsWithPaginate = (category, config, page = 1, maxPage = 10, productsAcc = []) => {
  const url = category.url + config.categoryPageParam + page
  return getProductsByCategory(url, category.name, config)
    .then((productsByCategory) => {
      productsAcc = [...productsAcc, ...productsByCategory]
      page++

      if (page <= maxPage) {
        return getProductsWithPaginate(category, config, page, maxPage, productsAcc)
          .then((products) => {
            return products
          })
      } else {
        return productsAcc
      }
    }).catch((error) => {
      throw error
    })
}

const getAllProductDetails = (products, config) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const productDetailPool = promisePool({
        threads: 6,
        promises: ({ index, data }) => {
          if (index >= data.length) return null

          const product = data[index]
          return getProductDetails(product.url, config)
        },
        context_data: products
      })

      productDetailPool.then((results) => {
        const allProducts = results.map((r, index) => {
          return { ...products[index], ...r.result }
        })

        resolve(allProducts)
      }).catch((error) => {
        reject(error)
      })
    }, config.timeoutDetails)
  })

export { init }
