import mongoose from 'mongoose'

const tagSchema = new mongoose.Schema({
  value: {
    type: String,
    unique: true
  }
})

const tagModel = mongoose.model('tagModel', tagSchema)

export default tagModel
