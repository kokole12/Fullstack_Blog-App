import mongoose from 'mongoose'

const slugSchema = new mongoose.Schema({
  value: {
    type: String,
    unique: true
  }
})

const slugModel = mongoose.model('slugModel', slugSchema)

export default slugModel
