import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express, { Response } from 'express'
import 'express-async-errors'
import mongoSanitize from 'express-mongo-sanitize'
import helmet from 'helmet'
import { StatusCodes } from 'http-status-codes'
import mongoose from 'mongoose'
import morgan from 'morgan'
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware'
import userJobRouter from './routes/user/userJob'

dotenv.config()

const app = express()

app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }))
app.use(mongoSanitize())

app.use(morgan('dev'))

const port = process.env.PORT || 6001

app.use('/api/job', userJobRouter)

app.use('*', (_, res: Response) => {
  res.status(StatusCodes.NOT_FOUND).json({ msg: 'not found' })
})

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
