import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import {
  NotFoundError,
  UnauthenticatedError,
  UnauthorizedError,
} from '../../errors/customError'
import Job from '../../model/job'

export const deleteJob = async (req: Request, res: Response) => {
  const { id, adminId } = req.params
  const { authorization } = req.headers

  const adminUID = process.env.ADMIN_UID

  if (authorization && !authorization.startsWith('Bearer')) {
    throw new UnauthenticatedError('Please log in')
  }

  if (adminId !== adminUID) {
    throw new UnauthorizedError('Only admin can delete a job, 🔥')
  }

  const foundJob = await Job.findOne({ _id: id })
  if (!foundJob) {
    throw new NotFoundError('Job not found')
  }
  await Job.deleteOne({ _id: id })

  res.status(StatusCodes.OK).json({ msg: `${foundJob.title} deleted` })
}
