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

  async findByCategory(category) {
    if (!category) return []
    let data = {}

    const aggregateQuery = [
      { '$match': { 'category.name': { $regex: category, '$options' : 'i' } } },
      {
        '$project':
        {
          _id: 0, name: 1, url: 1, price: 1, description: 1,
          sizes: 1, category: '$category.name', store: 1
        }
      },
      {
        '$group':
        {
          _id: { store: '$store' },
          'products': {
            '$first':
            {
              name: "$name", url: '$url', image: '$image', price: "$price",
              category: '$category', sizes: '$sizes', description: '$description'
            }
          }
        }
      },
      { '$sort': { 'products.price': -1 } },
      { '$limit': 3 }
    ]

    try {
      data = await ProductModel.aggregate(aggregateQuery).exec()
    } catch (error) {
      logger.error(`Error to find products from category ${category}`, error)
    }

    return data.map((d) => d.products)
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
