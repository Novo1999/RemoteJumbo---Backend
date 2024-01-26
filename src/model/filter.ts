import { model, Schema } from 'mongoose'

const FilterSchema = new Schema({
  location: [String],
  position: [String],
  types: [String],
  benefits: [String],
  salary: {
    min: Number,
    max: Number,
  },
})

export default model('Filter', FilterSchema)
