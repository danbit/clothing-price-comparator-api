import scrapeIt from 'scrape-it'

const getPlusSizeCategories = async ({ initialUrl, categories }) =>
  new Promise((resolve, reject) =>
    scrapeIt(initialUrl, {
      categories,
    })
      .then(({ data }) => {
        resolve(data.categories)
      })
      .catch((e) => {
        reject(e)
      })
  )

const getProductsByCategory = async (url, categoryName, { products }) =>
  new Promise((resolve, reject) =>
    scrapeIt(url, {
      products,
    })
      .then(({ data }) => {
        resolve(
          data.products.map((p) => {
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

export { getPlusSizeCategories, getProductsByCategory, getProductDetails }
