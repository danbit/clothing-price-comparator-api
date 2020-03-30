import { responseError, HTTP_STATUS } from '../helpers/httpHelper'

export default class Router {
  constructor(request, response) {
    this.req = request
    this.res = response
  }

  async processRouters(routes) {
    const foundedRoute = routes.find((r) => {
      if (r.method !== this.req.method) {
        return false
      }

      return r.url instanceof Object
        ? this.req.url.match(r.url)
        : this.req.url === r.url
    })

    if (foundedRoute) {
      return foundedRoute.handler(this.req, this.res)
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
