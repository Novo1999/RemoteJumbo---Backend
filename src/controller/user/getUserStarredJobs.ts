import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import Job from '../../model/job'

export const getUserStarredJobs = async (req: Request, res: Response) => {
  const { uid } = req.params
  const job = await Job.find({ 'isStarred.userId': { $in: [uid] } }) // get those jobs where the passed user id exists
  res.status(StatusCodes.OK).json(job)
}
