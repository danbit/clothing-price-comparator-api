import scrapeIt from 'scrape-it'

const getPlusSizeCategories = async ({ initialUrl, homeUrl, categories }) =>
  new Promise((resolve, reject) =>
    scrapeIt(initialUrl, {
      categories,
    })
      .then(({ data }) => {
        resolve(
          data.categories.map((c) => {
            c.url = completeUrlItem(homeUrl, c)
            return c
          })
        )
      })
      .catch((e) => {
        reject(e)
      })
  )

const getProductsByCategory = async (url, categoryName, { store, homeUrl, products }) =>
  new Promise((resolve, reject) =>
    scrapeIt(url, {
      products,
    })
      .then(({ data }) => {
        resolve(
          data.products.map((p) => {
            p.store = store
            p.url = completeUrlItem(homeUrl, p)
            p.price = checkPriceAnUpdateToPromotional(p)
            p.category = {
              url,
              name: categoryName,
            }
            return p
          })
        )
      })
      .catch((e) => {
        reject(e)
      })
  )

const getProductDetails = async (productUrl, { details }) =>
  new Promise((resolve, reject) =>
    scrapeIt(productUrl, {
      ...details,
    })
      .then(({ data }) => {
        resolve(data)
      })
      .catch((e) => {
        reject(e)
      })
  )

const completeUrlItem = (homeUrl, item, fieldName = 'url') => {
  if (!homeUrl) return item[fieldName]
  return homeUrl + item[fieldName]
}

const checkPriceAnUpdateToPromotional = (product) => {
  if (!product.pricePromotional) return product.price
  return product.price === 0.0 && product.pricePromotional >= 0
    ? product.pricePromotional
    : product.price
}

export { getPlusSizeCategories, getProductsByCategory, getProductDetails }
