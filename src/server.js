import http from 'http'
import Router from './router/Router'
import routes from './router/routes'
import { configHelper } from './helpers'

const { hostname, port } = configHelper.app

const server = http.createServer(async (req, res) => {
  await new Router(req, res).processRouters(routes)
})

server.listen(port, hostname, () => {
  console.log(`🚀 Server running at http://${hostname}:${port}/`)
})
