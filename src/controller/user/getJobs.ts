import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import Job from '../../model/job'

interface Query {
  limit: number
}

export const getJobs = async (
  req: Request<unknown, unknown, unknown, Query>,
  res: Response
) => {
  const { limit } = req.query
  const jobs = await Job.find({}).limit(limit)
  res.status(StatusCodes.OK).json(jobs)
}
