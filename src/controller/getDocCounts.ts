import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import Job from '../model/job'

export const getDocCounts = async (req: Request, res: Response) => {
  const totalJobs = await Job.countDocuments({})
  res.status(StatusCodes.OK).json(totalJobs)
}
