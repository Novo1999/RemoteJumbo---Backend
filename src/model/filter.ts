import { model, Schema } from 'mongoose'
import {
  JOB_BENEFITS,
  JOB_LOCATIONS,
  JOB_POSITIONS,
  JOB_TYPES,
} from '../utils/constants'

const FilterSchema = new Schema({
  location: [
    {
      type: String,
      enum: JOB_LOCATIONS,
    },
  ],
  position: [
    {
      type: String,
      enum: JOB_POSITIONS,
    },
  ],
  types: [
    {
      type: String,
      enum: JOB_TYPES,
    },
  ],
  benefits: [
    {
      type: String,
      enum: JOB_BENEFITS,
    },
  ],
  salary: {
    min: Number,
    max: Number,
  },
})

export default model('Filter', FilterSchema)
