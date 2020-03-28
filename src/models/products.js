import Mongoose from 'mongoose'

const schema = new Mongoose.Schema(
  {
    store: {
      type: String,
      required: true,
    },
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
      default: 'https://media.defense.gov/2019/Jul/30/2002164249/-1/-1/0/190730-A-HG995-1002.PNG',
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

const ProductModel = Mongoose.model('products', schema)

ProductModel.collection.createIndex(
  { 'name': 'text', 'category.name': 'text' },
  { 'name': 'product_text_index', 'background': true, 'weights': { 'name': 3, 'category.name': 5 }, 'default_language': 'portuguese' }
)

export default ProductModel
