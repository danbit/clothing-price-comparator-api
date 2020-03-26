import http from 'http'
import Router from './router/Router'
import routes from './router/routes'
import { configHelper, dataBaseHelper } from './helpers'
import * as crawler from './crawler'

(async () => {
  //await dataBaseHelper.connect()
  crawler.init()
})()

const { hostname, port } = configHelper.app

const server = http.createServer(async (req, res) => {
  await new Router(req, res).processRouters(routes)
})

server.listen(port, hostname, () => {
  console.log(`🚀 Server running at http://${hostname}:${port}/`)
})
