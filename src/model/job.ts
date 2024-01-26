import { model, Schema } from 'mongoose'
import { JOB_BENEFITS, JOB_POSITIONS } from '../utils/constants'

const JobSchema = new Schema({
  imageUrl: String,
  title: String,
  company: String,
  posted: Number,
  salary: {
    min: Number,
    max: Number,
  },
  position: {
    type: String,
    enum: JOB_POSITIONS,
  },
  benefits: [
    {
      type: String,
      enum: JOB_BENEFITS,
    },
  ],
  location: String,
  isNew: {
    type: Boolean,
    default: false,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  jobType: String,
  isStarred: {
    userId: String,
  },
})

export default model('Job', JobSchema)
