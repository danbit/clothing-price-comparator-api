import ProductModel from '../models/products'

export default class ProductService {
  async save(product) {
    if (!product) return

    const query = { name: product.name, 'category.url': product.category.url }

    try {
      await ProductModel.findOneAndUpdate(
        query,
        { ...product },
        { upsert: true }
      ).exec()
    } catch (error) {
      console.log(`Erro to save product ${product.name}`, error)
    }
  }

  async insertMany(products) {
    if (!products) return

    try {
      await ProductModel.insertMany(products)
    } catch (error) {
      console.log(`Erro to insertMany products`, error)
    }
  }

  async findByCategory(category) {
    if (!category) return []
    let data = {}

    const aggregateQuery = [
      { '$match': { '$text': { '$search': category } } },
      {
        '$project':
        {
          _id: 0, name: 1, url: 1, price: 1, description: 1,
          sizes: 1, category: '$category.name', categoryUrl: '$category.url', score: { $meta: "textScore" }
        }
      },
      { '$match': { score: { $gt: 5 } } },
      {
        '$group':
        {
          _id: {
            categoryUrl: '$categoryUrl',
            category: '$category'
          },
          'products': { '$first': { name: "$name", price: "$price", url: '$url' } }
        }
      },
      { '$sort': { 'price': -1 } },
      { '$limit': 3 }
    ]

    try {
      data = await ProductModel.aggregate(aggregateQuery).exec()
      console.log(data)
    } catch (error) {
      console.log(`Erro to find products from category ${category}`, error)
    }

    return data
  }
}
