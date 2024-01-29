import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import Job from '../../model/job'

export const addViewCount = async (req: Request, res: Response) => {
  const job = await Job.findOne({ _id: req.params.id })
  job.viewCount += 1
  const updated = await job.save()
  res.status(StatusCodes.OK).json(updated)
}
