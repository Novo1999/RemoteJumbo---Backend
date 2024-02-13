import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import Job from '../../model/job'
import { Query } from '../../interfaces'

export const searchJob = async (
  req: Request<unknown, unknown, unknown, Query>,
  res: Response
) => {
  const { q } = req.query
  const job = await Job.find({ title: { $regex: q.trim(), $options: 'i' } })
  res.status(StatusCodes.OK).json(job)
}
