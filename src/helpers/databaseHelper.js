import * as mongoose from 'mongoose'
import { configHelper } from '.'

const config = {
  uri: configHelper.database.mongodb.uri,
  options: {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  },
}

const connect = () => new Promise((resolve, reject) => {
  mongoose.connect(config.uri, config.options)
    .then(() => {
      /* Debug */
      resolve(`MongoDB connected at ${config.uri}`)
    }, (error) => {
      reject(error)
    })
})

export { connect }
