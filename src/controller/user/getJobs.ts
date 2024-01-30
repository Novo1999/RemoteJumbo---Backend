import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import Job from '../../model/job'
import { JOB_SORTS } from '../../utils/constants'
import { Query } from '../../utils/interfaces'

const sortByValue = (sortBy: string) => {
  switch (sortBy) {
    case JOB_SORTS.salaryAscending:
      return { 'salary.min': 'asc' }
    case JOB_SORTS.salaryDescending:
      return { 'salary.min': 'desc' }
    case JOB_SORTS.mostApplied:
      return { applyCount: 'desc' }
    case JOB_SORTS.mostViewed:
      return { viewCount: 'desc' }
    case JOB_SORTS.newJobs:
      return { posted: -1 }
    case JOB_SORTS.featuredJobs:
      return { isFeatured: -1 }
    case JOB_SORTS.ads:
      return { isAd: -1 }
  }
}

export const getJobs = async (
  req: Request<unknown, unknown, unknown, Query>,
  res: Response
) => {
  const { limit, sortBy } = req.query
  const jobs = await Job.find({})
    .sort(sortByValue(sortBy) as {})
    .limit(limit)
  res.status(StatusCodes.OK).json(jobs)
}
