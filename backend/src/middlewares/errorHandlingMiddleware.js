/* eslint-disable no-unused-vars */
import { StatusCodes } from 'http-status-codes'

export const errorHandlingMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR
  const message = err.message || StatusCodes[statusCode]

  const responseError = {
    statusCode,
    message,
    stack: err.stack
  }

  if (process.env.NODE_ENV === 'production') {
    delete responseError.stack
  }

  res.status(responseError.statusCode).json(responseError)
}
