import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now()
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'userModel',
    required: true
  }
})

const Comment = mongoose.model('Comment', commentSchema)

export default Comment
