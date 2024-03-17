import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import {
  UnauthenticatedError,
  UnauthorizedError,
} from '../../errors/customError'
import Job from '../../model/job'

export const getJobStats = async (req: Request, res: Response) => {
  const authorization = req.headers.authorization
  const { adminId } = req.params
  const adminUID = process.env.ADMIN_UID

  if (adminId !== adminUID) {
    throw new UnauthorizedError('This page is only available for admin')
  } else {
    if (authorization && !authorization.startsWith('Bearer')) {
      throw new UnauthenticatedError('Please log in')
    }

    const mostViewedJobs = await Job.find().sort({ viewCount: -1 }).limit(10)
    const mostAppliedJobs = await Job.find().sort({ applyCount: -1 }).limit(10)
    const mostStarredJobs = await Job.aggregate([
      {
        $unwind: '$isStarred', // Unwind the array field isStarred.userId
      },
    ]).limit(10)

    return res.status(StatusCodes.OK).json({
      mostViewedJobs: { jobs: mostViewedJobs, count: mostViewedJobs.length },
      mostStarredJobs: { jobs: mostStarredJobs, count: mostStarredJobs.length },
      mostAppliedJobs: { jobs: mostAppliedJobs, count: mostAppliedJobs.length },
    })
  }
}
