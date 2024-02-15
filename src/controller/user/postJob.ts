import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import Job from '../../model/job'
import { cloudinary } from '../../utils/cloudinary'

export const postJob = async (req: Request, res: Response) => {
  const { companyImage, salary } = req.body

  const result = await cloudinary.uploader.upload(companyImage, {
    folder: 'company_images',
    width: 300,
    crop: 'scale',
  })

  const salaryObj = {
    min: Number(salary.split('-')[0]),
    max: Number(salary.split('-')[1]),
  }

  const job = await Job.create({
    ...req.body,
    salary: salaryObj,
    companyLogo: {
      public_id: result.public_id,
      url: result.secure_url,
    },
  })
  res.status(StatusCodes.OK).json(job)
}
