import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import Job from '../../model/job'

export const getMaxSalary = async (req: Request, res: Response) => {
  const job = await Job.findOne({}).sort('-salary.max') // get max salary
  res.status(StatusCodes.OK).json({ max: job.salary.max })
}
