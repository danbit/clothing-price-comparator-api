import path from 'path'

require('dotenv').config({
  path: path.resolve(process.cwd(), '.env.development'),
})

const { APP_HOSTNAME, APP_PORT, MONGODB_URI } = process.env

export default {
  app: {
    hostname: APP_HOSTNAME || '127.0.0.1',
    port: APP_PORT ? parseInt(APP_PORT, 10) : 3000,
  },
  database: {
    mongodb: {
      uri: MONGODB_URI,
    },
  },
}
