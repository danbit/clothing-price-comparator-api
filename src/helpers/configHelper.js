import path from 'path'

require('dotenv').config({
  path: path.resolve(process.cwd(), '.env.development'),
})

const {
  NODE_ENV,
  APP_HOSTNAME,
  APP_PORT,
  MONGODB_URI,
  JOBS_CRAWLER_CRON_EXPRESSION,
  LOG_SERVICE,
  LOG_PATH,
} = process.env

export default {
  nodeEnv: NODE_ENV,
  app: {
    hostname: APP_HOSTNAME || '127.0.0.1',
    port: APP_PORT ? parseInt(APP_PORT, 10) : 3000,
  },
  log: {
    service: LOG_SERVICE,
    path: NODE_ENV !== 'development' ? LOG_PATH : './log',
  },
  mongodb: {
    uri: MONGODB_URI,
  },
  jobs: {
    crwaler: {
      cronExpression: JOBS_CRAWLER_CRON_EXPRESSION,
    },
  }
}
