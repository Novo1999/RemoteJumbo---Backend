import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import Job from '../../model/job'
import { cloudinary } from '../../utils/cloudinary'
import { validationResult } from 'express-validator'

export const postJob = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { companyImage, salary } = req.body
  const result = validationResult(req)

  if (result.isEmpty()) {
    const cloudinaryResult = await cloudinary.uploader.upload(companyImage, {
      folder: 'company_images',
      width: 300,
      crop: 'scale',
    })

    // taking salary from value like 50-60
    const salaryObj = {
      min: Number(salary.split('-')[0]),
      max: Number(salary.split('-')[1]),
    }

    const job = await Job.create({
      ...req.body,
      salary: salaryObj,
      companyLogo: {
        public_id: cloudinaryResult.public_id,
        url: cloudinaryResult.secure_url,
      },
    })
    return res.status(StatusCodes.OK).json(job)
  }
  res.send({ errors: result.array() })
}
