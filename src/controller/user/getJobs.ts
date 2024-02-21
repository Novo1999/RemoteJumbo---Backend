import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { Query } from '../../interfaces'
import Job from '../../model/job'
import { constructFindOptions } from '../../utils/constructFindOptions'
import { sortByValue } from '../../utils/sortByValue'

export const getJobs = async (
  req: Request<unknown, unknown, unknown, Query>,
  res: Response
) => {
  const {
    locations = '',
    positions = '',
    salary,
    types = '',
    benefits = '',
    limit,
    sortBy = '',
    q = '',
  } = req.query || {}

  let findParam = {}

  if (locations || positions || types || benefits || q) {
    findParam = constructFindOptions({
      locations,
      positions,
      types,
      benefits,
      salary,
      q,
    })
  }

  const jobs = await Job.find(findParam)
    .sort(sortByValue(sortBy) as {})
    .limit(limit)
  res.status(StatusCodes.OK).json(jobs)
}
