import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { connectDB } from './config/mongodb.js'
import { APIs_V1 } from './routes/v1/index.js'
import { errorHandlingMiddleware } from './middlewares/errorHandlingMiddleware.js'
import { corsOptions } from './config/cors.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors(corsOptions))

app.use(cookieParser())
app.use(express.json())

app.use('/api/v1', APIs_V1)

app.use(errorHandlingMiddleware)

connectDB()

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
