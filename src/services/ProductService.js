import ProductModel from "../models/products"

export default class ProductService {

  async save(product) {
    if (!product) return

    const query = { name: product.name, 'category.url': product.category.url }

    try {
      await ProductModel.findOneAndUpdate(query,
        { ...product },
        { upsert: true }
      ).exec()
    } catch (error) {
      console.log(`Erro to save product ${product.name}`, error)
    }
  }

  async findByCategory(category) {
    if (!category) return []

    const query = { 'category.url': product.category.url }

    try {
      return await ProductModel.find(query).sort({'price': -1}).limit(10).exec()
    } catch (error) {
      console.log(`Erro to save product ${product.name}`, error)
    }

    return []
  }
}
