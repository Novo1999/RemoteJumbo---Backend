import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { Query } from '../../interfaces'
import Job from '../../model/job'

export const searchJob = async (
  req: Request<unknown, unknown, unknown, Query>,
  res: Response
) => {
  const { q } = req.query

  const regexQuery = { $regex: q.trim(), $options: 'i' }

  const job = await Job.find({
    $or: [
      {
        title: regexQuery,
      },
      {
        companyName: regexQuery,
      },
    ],
  })
  res.status(StatusCodes.OK).json(job)
}
