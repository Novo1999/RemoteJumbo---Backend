import { v2 as cloudinary } from 'cloudinary'
import dotenv from 'dotenv'
import path from 'path'

const cloudName = process.env.CLOUD_NAME
const apiKey = process.env.API_KEY
const apiSecret = process.env.API_SECRET

dotenv.config({ path: path.resolve(__dirname, '../.env') })

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
})

export { cloudinary }
