import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import mongoose from 'mongoose'
import Job from '../../model/job'

export const getRandomJobs = async (req: Request, res: Response) => {
  const excludedJobId = new mongoose.Types.ObjectId(req.params.id) // Convert to ObjectId
  const { relevant } = req.query

  // user will click a job, but there will be no point showing the same job in the related jobs section
  const pipeline = [
    {
      $match: {
        _id: {
          $ne: excludedJobId, // dont show the same job
        },
        position: {
          $regex: relevant,
        },
      },
    },
    {
      $limit: 3, // only show 3 jobs
    },
  ]

  const jobs = await Job.aggregate(pipeline)
  res.status(StatusCodes.OK).json(jobs)
}
