import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { StatusCodes } from 'http-status-codes'
import { UnauthenticatedError } from '../../errors/customError'
import Job from '../../model/job'
import { cloudinary } from '../../utils/cloudinary'

export const editJob = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { companyImage, salary } = req.body
  const { id } = req.params
  const authorization = req.headers.authorization

  if (authorization && !authorization.startsWith('Bearer')) {
    throw new UnauthenticatedError('Please log in')
  }

  const result = validationResult(req)
  if (result.isEmpty()) {
    const cloudinaryResult =
      companyImage &&
      (await cloudinary.uploader.upload(companyImage, {
        folder: 'company_images',
        width: 300,
        crop: 'scale',
      }))

    // taking salary from value like 50-60
    const salaryObj = {
      min: Number(salary.split('-')[0]),
      max: Number(salary.split('-')[1]),
    }

    const job = await Job.findOneAndUpdate(
      { _id: id },
      {
        ...req.body,
        salary: salaryObj,
        companyLogo: companyImage && {
          public_id: cloudinaryResult.public_id,
          url: cloudinaryResult.secure_url,
        },
      }
    )
    return res.status(StatusCodes.OK).json(job)
  }
  res.status(StatusCodes.BAD_REQUEST).send({ errors: result.array() })
}
