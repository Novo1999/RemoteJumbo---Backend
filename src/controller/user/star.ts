import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import Job from '../../model/job'

export const starJob = async (req: Request, res: Response) => {
  const idToFind = req.params.id

  const authorization = req.headers.authorization

  if (authorization && !authorization.startsWith('Bearer')) {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: 'Not Authorized. Please Log in' })
  }

  const { userId: idToInsert } = req.body
  const job = await Job.findOne({ _id: idToFind })
  const starredIds = job.isStarred.userId
  // pushing the user id to the jobs to set how many users have starred the job
  if (starredIds.includes(idToInsert)) {
    const indexToRemove = starredIds.findIndex((id) => id === idToInsert)
    starredIds.splice(indexToRemove, 1)
  } else {
    starredIds.push(idToInsert)
  }
  await job.save()

  res.status(StatusCodes.OK).json(job)
}
