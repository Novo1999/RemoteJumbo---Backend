import { v2 as cloudinary } from 'cloudinary'
import dotenv from 'dotenv'

dotenv.config()

const cloudName = process.env.CLOUD_NAME
const apiKey = process.env.API_KEY
const apiSecret = process.env.API_SECRET

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
})

export { cloudinary }
