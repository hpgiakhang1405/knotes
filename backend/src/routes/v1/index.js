import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { authRoute } from './authRoute.js'

const Router = express.Router()

Router.use('/auth', authRoute)

Router.get('/', (req, res) => {
  res.status(StatusCodes.OK).json({ message: 'Welcome to Knotes API' })
})

export const APIs_V1 = Router
