import 'express-async-errors'
import express from 'express'
import { Request, Response } from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan'
import dotenv from 'dotenv'
import cors from 'cors'
import helmet from 'helmet'
import bodyParser from 'body-parser'
import mongoSanitize from 'express-mongo-sanitize'
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware'

dotenv.config()

const app = express()

app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }))
app.use(mongoSanitize())

app.use(morgan('dev'))

const port = process.env.PORT || 6001

app.use(errorHandlerMiddleware)

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL)
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`)
    })
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

run()
