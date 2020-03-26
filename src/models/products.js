import Mongoose from 'mongoose'

const schema = new Mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      default: 0.0,
      required: true,
    },
    category: {
      name: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    sizes: {
      type: Array,
      default: [],
    },
    description: String,
  },
  { timestamps: true }
)

schema.index(
  { name: 'text' },
  { name: 'name_text_index', language: 'portuguese' }
)

schema.method('mapToProduct', () => {
  const product = this.toObject()

  delete product.__v
  delete product.createdAt
  delete product.updatedAt
  delete product.deletedAt

  return product
})

const ProductModel = Mongoose.model('Products', schema)

export default ProductModel
