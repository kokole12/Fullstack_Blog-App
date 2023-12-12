import mongoose from 'mongoose'

const likeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'userModel',
    required: true
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PostModel',
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  }
})

const Likes = mongoose.model('Likes', likeSchema)

export default Likes
