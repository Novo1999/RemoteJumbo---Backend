import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import Job from '../../model/job'

export const filterJobs = async (req: Request, res: Response) => {
  const { location, position, salary, type, benefits } = req.body
  console.log(position)

  // gets jobs matching fields and the salary
  const jobs = await Job.find({
    $or: [
      { location: { $in: location } },
      { position: { $in: position } },
      { jobType: { $in: type } },
      { benefits: { $in: benefits } },
    ],
    $and: [{ 'salary.min': { $lte: salary } }],
  })

  res.status(StatusCodes.OK).json(jobs)
}
