import url from 'url'
import { responseError, HTTP_STATUS } from '../helpers/httpHelper'

export default class Router {
  constructor(request, response) {
    this.req = request
    this.res = response
  }

  async processRouters(routes) {
    const foundedRoute = routes.find(
      (r) => r.method === this.req.method && r.url === this.req.url
    )

    if (foundedRoute) {
      const { query } = url.parse(this.req.url, true)

      return foundedRoute.handler(this.req, this.res, query)
    }

    return responseError(
      this.res,
      new Error(
        `Unknown method '${this.req.method}_${this.req.url}'`,
        HTTP_STATUS.NOT_FOUND
      )
    )
  }
}
