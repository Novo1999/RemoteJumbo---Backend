import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import PostJob from '../../model/postJob'
import { cloudinary } from '../../utils/cloudinary'

export const postJob = async (req: Request, res: Response) => {
  const { image } = req.body

  const result = await cloudinary.uploader.upload(image, {
    folder: 'company_images',
    width: 300,
    crop: 'scale',
  })

  const job = await PostJob.create({
    ...req.body,
    companyLogo: {
      public_id: result.public_id,
      url: result.secure_url,
    },
  })
  res.status(StatusCodes.OK).json(job)
}
