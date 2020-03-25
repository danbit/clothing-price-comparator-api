import http from 'http'
import Router from './router/Router'
import routes from './router/routes'
import {
  getPlusSizeCategories,
  getProductsByCategory,
  getProductDetails,
} from './scraper'
import { configHelper } from './helpers'
import configs from './scraper/configs'

(async () => {
  const config = configs[1]
  const categories = await getPlusSizeCategories(config);
  let products = []

  for (const category of categories) {
    const productsByCategory = await getProductsByCategory(category, config)
    products = [...products, ...productsByCategory]
    break
  }

  products = await Promise.all(products.map(async p => {
    const details = await getProductDetails(p.url, config)
    return { ...p, ...details };
  }));

  console.log(products)
})()

const { hostname, port } = configHelper.app

const server = http.createServer(async (req, res) => {
  await new Router(req, res).processRouters(routes)
})

server.listen(port, hostname, () => {
  console.log(`🚀 Server running at http://${hostname}:${port}/`)
})
