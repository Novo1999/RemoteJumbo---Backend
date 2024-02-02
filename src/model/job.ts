import { model, Schema } from 'mongoose'

const JobSchema = new Schema({
  imageUrl: String,
  title: String,
  company: String,
  posted: String,
  salary: {
    min: Number,
    max: Number,
  },
  position: {
    type: String,
  },
  benefits: [
    {
      type: String,
    },
  ],
  location: String,
  new: {
    type: Boolean,
    default: false,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  isAd: {
    type: Boolean,
    default: false,
  },
  jobType: String,
  isStarred: {
    userId: [String],
  },
  viewCount: Number,
  applyCount: Number,
})

export default model('Job', JobSchema)
