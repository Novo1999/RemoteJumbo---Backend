import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import Job from '../../model/job'
import { JOB_SORTS } from '../../utils/constants'

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
      return { new: -1 }
    case JOB_SORTS.featuredJobs:
      return { isFeatured: -1 }
    case JOB_SORTS.ads:
      return { isAd: -1 }
  }
}

export const sortJobs = async (req: Request, res: Response) => {
  const { sortBy } = req.params
  const jobs = await Job.find({}).sort(sortByValue(sortBy) as {})
  res.status(StatusCodes.OK).json(jobs)
}
