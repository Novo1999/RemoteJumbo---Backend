import { model, Schema } from 'mongoose'

const Starred = new Schema({
  companies: [
    {
      name: String,
      count: Number,
    },
  ],
})

export default model('Starred', Starred)
