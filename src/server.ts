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
import { shuffleAds } from './controller/shuffleAds'
import * as cron from 'cron'

dotenv.config()

const app = express()

app.use(express.json({ limit: '10mb' }))
app.use(bodyParser.json({ limit: '10mb' }))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))

app.use(cors())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }))
app.use(mongoSanitize())

app.use(morgan('dev'))

const port = process.env.PORT || 6001

app.use('/api/job', userJobRouter)

// this shuffles the jobs ad status
const cronJob = cron.CronJob.from({
  cronTime: '0 23 * * *', // This means run at 0 minutes past 23rd hour (11 PM) every day
  onTick: function () {
    shuffleAds()
  },
  start: true,
  timeZone: 'Asia/Dhaka',
})

cronJob.start() // Start the cron job

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
