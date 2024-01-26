import { model, Schema } from 'mongoose'

const JobSchema = new Schema({
  imageUrl: String,
  title: String,
  company: String,
  posted: Number,
  salary: {
    min: Number,
    max: Number,
  },
  positions: [String],
  benefits: [String],
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
})

export default model('Job', JobSchema)
