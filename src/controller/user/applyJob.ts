import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError } from '../../errors/customError'
import Job from '../../model/job'

export const applyJob = async (req: Request, res: Response) => {
  const idToFind = req.params.id

  const authorization = req.headers.authorization

  if (authorization && !authorization.startsWith('Bearer')) {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: 'Not Authorized. Please Log in' })
  }

  const { userId: idToInsert } = req.body
  const job = await Job.findOne({ _id: idToFind })
  const appliedIds = job.appliedBy.userId
  if (appliedIds.includes(idToInsert)) {
    throw new BadRequestError('You already applied to this job')
  } else {
    appliedIds.push(idToInsert)
    job.applyCount += 1
  }
  await job.save()

  res.status(StatusCodes.OK).json(job)
}
