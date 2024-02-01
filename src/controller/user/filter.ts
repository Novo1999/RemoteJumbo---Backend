import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import Job from '../../model/job'
import { FilterQuery } from '../../utils/interfaces'
import { sortByValue } from './getJobs'

export const filterJobs = async (
  req: Request<unknown, unknown, unknown, FilterQuery>,
  res: Response
) => {
  const {
    locations = '',
    positions = '',
    salary = 100,
    types = '',
    benefits = '',
    sortBy,
  } = req.query || {}

  const locationSplit = locations.split(',')

  // to get locations and state as pair separated by comma
  let locationPair = []
  if (locations !== '') {
    for (let i = 0; i < locationSplit.length; i += 2) {
      const pair = `${locationSplit[i]},${locationSplit[i + 1]}`
      locationPair.push(pair.trim())
    }
  }
  const arraysOfQuery = {
    locations: locationPair,
    positions: positions.split(','),
    types: types.toLowerCase().split(','),
    benefits: benefits.split(','),
  }

  // gets jobs matching fields and the salary
  const jobs = await Job.find({
    $or: [
      { location: { $in: arraysOfQuery.locations || [] } },
      { position: { $in: arraysOfQuery.positions || [] } },
      { jobType: { $in: arraysOfQuery.types || [] } },
      { benefits: { $in: arraysOfQuery.benefits || [] } },
    ],
    $and: [{ 'salary.min': { $lte: Number(salary) } }],
  }).sort(sortByValue(sortBy) as {})

  res.status(StatusCodes.OK).json({ result: jobs, filteredJobs: jobs.length })
}
