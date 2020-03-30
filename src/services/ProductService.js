import { calculateLimitAndOffset, paginate } from 'paginate-info'
import ProductModel from '../models/products'
import logger from '../log'

export default class ProductService {
  async save(product) {
    if (!product) return

    const newProduct = new ProductModel(product)

    try {
      await newProduct.save()
    } catch (error) {
      logger.error(`Error to save product ${product.name}`, error)
    }
  }

  async saveOrUpdate(product) {
    if (!product) return

    const query = { name: product.name, 'category.url': product.category.url }

    try {
      await ProductModel.findOneAndUpdate(
        query,
        { ...product },
        { upsert: true }
      ).exec()
    } catch (error) {
      logger.error(`Error to save product ${product.name}`, error)
    }
  }

  async countProducts() {
    let total = 0
    try {
      total = await ProductModel.countDocuments({})
    } catch (error) {
      logger.error(`Error to insertMany products`, error)
    }

    return total
  }

  async findByCategory(category, page = 1, size = 3) {
    if (!category) return []

    let data = {}
    const query = { 'category.name': { $regex: category, '$options': 'i' } }

    try {
      const count = await ProductModel.countDocuments(query)
      const { limit, offset } = calculateLimitAndOffset(page, size)

      const rows = await ProductModel.find(query).sort({ price: -1 }).limit(limit).skip(offset).exec()

      let products = rows.map(({ name, url, image, sizes, description, price, category }) => {
        return { name, url, image, sizes, description, price, category: category.name }
      })
      const meta = paginate(page, count, products, size);

      data = {
        products,
        meta,
      }
    } catch (error) {
      logger.error(`Error to find products from category ${category}`, error)
    }

    return data
  }

  async insertMany(products) {
    if (!products) return

    try {
      await ProductModel.insertMany(products)
    } catch (error) {
      logger.error(`Error to insert many products`, error)
    }
  }
}
