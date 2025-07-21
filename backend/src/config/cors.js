import { StatusCodes } from 'http-status-codes'
import ApiError from '../utils/ApiError.js'
import { ENV } from './environment.js'

const WHITELIST_DOMAINS = [ENV.CLIENT_URL]

export const corsOptions = {
  origin: function (origin, callback) {
    if (!origin && ENV.NODE_ENV === 'development') {
      return callback(null, true)
    }

    if (WHITELIST_DOMAINS.includes(origin)) {
      return callback(null, true)
    }

    return callback(new ApiError(StatusCodes.FORBIDDEN, `${origin} not allowed by our CORS Policy.`))
  },

  optionsSuccessStatus: 200,
  credentials: true
}
