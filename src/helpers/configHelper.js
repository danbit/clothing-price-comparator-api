import path from 'path'

require('dotenv').config({
  path: path.resolve(process.cwd(), '.env.development'),
})

const {
  APP_HOSTNAME,
  APP_PORT,
  MONGODB_URI,
  JOBS_CRAWLER_CRON_EXPRESSION,
} = process.env

export default {
  app: {
    hostname: APP_HOSTNAME || '127.0.0.1',
    port: APP_PORT ? parseInt(APP_PORT, 10) : 3000,
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
