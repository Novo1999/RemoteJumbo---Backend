import mongoose from 'mongoose'
import Job from '../model/job'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(__dirname, '../.env') })

export const shuffleAds = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL)
    const jobs = await Job.find({})
    for (const job of jobs) {
      job.isAd = !job.isAd
      await job.save()
    }
    console.log('DONE')
  } catch (error) {
    console.log(error)
  }
}

shuffleAds()
