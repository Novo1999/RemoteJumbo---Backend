import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, NotFoundError } from '../../errors/customError'
import Job from '../../model/job'

export const getJobs = async (req: Request, res: Response) => {
  const jobs = await Job.find({})
  res.status(StatusCodes.OK).json(jobs)
}
