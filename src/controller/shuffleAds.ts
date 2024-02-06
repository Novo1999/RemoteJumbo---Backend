import { Request, Response } from 'express'
import Job from '../model/job'
import { StatusCodes } from 'http-status-codes'

export const shuffleAds = async (req: Request, res: Response) => {
  const jobs = await Job.find({})
  for (const job of jobs) {
    job.isAd = !job.isAd
    await job.save()
  }
  res.status(StatusCodes.OK).json({ msg: 'done' })
}
