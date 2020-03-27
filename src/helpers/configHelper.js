import path from 'path'

require('dotenv').config({
  path: path.resolve(process.cwd(), '.env.development'),
})

const {
  APP_HOSTNAME,
  APP_PORT,
  MONGODB_URI,
  ELASTICSEARCH_URL,
  ELASTICSEARCH_REQUEST_TIMEOUT,
  ELASTICSEARCH_INDEX
} = process.env

export default {
  app: {
    hostname: APP_HOSTNAME || '127.0.0.1',
    port: APP_PORT ? parseInt(APP_PORT, 10) : 3000,
  },
  mongodb: {
    uri: MONGODB_URI,
  },
  elasticsearch: {
    url: ELASTICSEARCH_URL,
    requestTimeout: ELASTICSEARCH_REQUEST_TIMEOUT ? Number(ELASTICSEARCH_REQUEST_TIMEOUT) : 30000,
    index: ELASTICSEARCH_INDEX,
  },
}
