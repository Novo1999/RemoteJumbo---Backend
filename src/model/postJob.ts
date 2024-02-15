import { Schema, model } from 'mongoose'

const postJobSchema = new Schema({
  jobTitle: {
    type: String,
    required: true,
  },
  jobType: {
    type: String,
    required: true,
  },
  jobLocation: {
    type: String,
    required: true,
  },
  jobPosition: {
    type: String,
    required: true,
  },
  jobBenefits: {
    type: [String],
    required: true,
  },
  salary: {
    min: { type: Number, required: true },
    max: { type: Number, required: true },
  },
  jobDescription: {
    type: String,
    required: true,
    min: [100, 'description should be at least 100 characters'],
  },
  companyName: {
    type: String,
    required: true,
  },
  companyLogo: {
    public_id: String,
    url: String,
  },
  companyDescription: {
    type: String,
    required: true,
  },
})

export default model('PostJob', postJobSchema)
