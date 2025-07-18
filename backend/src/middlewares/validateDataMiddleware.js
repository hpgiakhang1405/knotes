import { StatusCodes } from 'http-status-codes'
import ApiError from '../utils/ApiError.js'

export const validateDataMiddleware = (schema) => (req, res, next) => {
  const parsed = schema.safeParse(req.body)

  if (parsed.success) {
    req.body = parsed.data
    return next()
  }

  const formattedErrors = Object.values(parsed.error.format())
    .flatMap((v) => v?._errors ?? [])
    .join(', ')

  next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, formattedErrors))
}
