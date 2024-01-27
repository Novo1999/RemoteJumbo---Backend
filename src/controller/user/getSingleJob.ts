import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import Job from '../../model/job'

export const getSingleJob = async (req: Request, res: Response) => {
  const job = await Job.findOne({ _id: req.params.id })
  res.status(StatusCodes.OK).json(job)
}
