import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import Job from '../../model/job'
import { constructFindOptions } from '../../utils/constructFindOptions'
import { Query } from '../../utils/interfaces'
import { sortByValue } from '../../utils/sortByValue'

export const getJobs = async (
  req: Request<unknown, unknown, unknown, Query>,
  res: Response
) => {
  const {
    locations = '',
    positions = '',
    salary = (await Job.findOne({}).sort({ 'salary.min': 'desc' })).salary.min, // this sets the max salary here by default as without that search result is not appearing
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
