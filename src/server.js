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
  await new Router(req, res).processRouters(routes)
})

server.listen(port, () => {
  logger.info(`🚀 Server running at http://hostname:${port}/`)
})
