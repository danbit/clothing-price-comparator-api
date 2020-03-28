const addHeader = (res) => res.setHeader('Content-Type', 'application/json')

export const HTTP_STATUS = {
  OK: {
    status: 'OK',
    code: 200,
  },
  NO_CONTENT: {
    status: 'No Content',
    code: 204,
  },
  NOT_FOUND: {
    status: 'Not Found',
    code: 404,
  },
  INTERNAL_SERVER_ERROR: {
    status: 'Internal Server Error',
    code: 500,
  },
}

export const responseSuccess = (
  res,
  data = null,
  httpStatus = HTTP_STATUS.OK
) => {
  addHeader(res)

  const { status, code } = httpStatus
  res.statusCode = code

  if (data) {
    const dataJson = JSON.stringify({ status, data })
    res.end(dataJson)
  } else {
    res.end()
  }
}

export const responseError = (
  res,
  error = null,
  httpStatus = HTTP_STATUS.INTERNAL_SERVER_ERROR
) => {
  addHeader(res)

  const message =
    error && typeof error === 'object' ? error.message : httpStatus.status

  res.statusCode = httpStatus.code

  const dataError = {
    timestamp: Date.now(),
    status: httpStatus.code,
    error: httpStatus.status,
    message,
  }

  res.end(JSON.stringify(dataError))
}
