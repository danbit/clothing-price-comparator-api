import productController from '../controllers/ProductController'
import { httpHelper } from '../helpers'
import { HTTP_STATUS } from '../helpers/httpHelper'

export default [
  {
    method: 'GET',
    url: /\/api\/products(\?|&)([^=]+)=([^&]+)/gm,
    handler: productController.getAll.bind(productController),
  },
  {
    method: 'GET',
    url: '/favicon.ico',
    handler: (_req, res) =>
      httpHelper.responseSuccess(res, null, HTTP_STATUS.NO_CONTENT),
  },
]
