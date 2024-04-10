import dotenv from 'dotenv'
import mongoose from 'mongoose'
import path from 'path'
import Job from '../model/job'

dotenv.config({ path: path.resolve(__dirname, '../.env') })

export const shuffleAds = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL)
    const jobs = await Job.find({})
    for (const job of jobs) {
      job.isAd = !job.isAd
      await job.save()
    }
    console.log('CRON DONE')
  } catch (error) {
    console.log(error)
  }
}

shuffleAds()
