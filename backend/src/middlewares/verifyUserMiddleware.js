import jwt from 'jsonwebtoken'
import { StatusCodes } from 'http-status-codes'
import ApiError from '../utils/ApiError.js'
import { ENV } from '../config/environment.js'

export const verifyUserMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new ApiError(StatusCodes.FORBIDDEN, 'Invalid or expired access token'))
  }

  const token = authHeader.split(' ')[1]

  jwt.verify(token, ENV.JWT_ACCESS_SECRET, (err, decoded) => {
    if (err) {
      return next(new ApiError(StatusCodes.FORBIDDEN, 'Invalid or expired access token'))
    }

    req.user = decoded
    next()
  })
}
