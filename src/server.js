import http from 'http'

import Router from './router/Router'
import routes from './router/routes'
import { configHelper, dataBaseHelper } from './helpers'
import { crawlerJob } from './jobs'
import logger from './log'

(async () => {
  try {
    await dataBaseHelper.connect()
    await crawlerJob.start()
  } catch (error) {
    logger.error(error)
  }
})()

const { port } = configHelper.app

const server = http.createServer(async (req, res) => {
  try {
    await new Router(req, res).processRouters(routes)
  } catch (error) {
    logger.error(error)
  }
})

server.listen(port, (e) => {
  logger.info(`🚀 Server running`)
})
