import { model, Schema } from 'mongoose'
import todaysDate from '../utils/formatDate'

const JobSchema = new Schema({
  title: String,
  company: String,
  posted: { type: String, default: todaysDate },
  salary: {
    min: Number,
    max: Number,
  },
  position: {
    type: String,
  },
  benefits: [{ type: String }],
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
  viewCount: { type: Number, default: 0 },
  applyCount: { type: Number, default: 0 },
  jobDescription: {
    type: String,
    min: [100, 'description should be at least 100 characters'],
  },
  companyName: {
    type: String,
  },
  companyLogo: {
    public_id: String,
    url: String,
  },
  companyDescription: {
    type: String,
  },
})

export default model('Job', JobSchema)
