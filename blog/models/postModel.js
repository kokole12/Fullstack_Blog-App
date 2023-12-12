import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },

  content: {
    type: String,
    required: true,
    trim: true
  },

  slug: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'slugModel',
    require: true
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Commnent'
  }],

  tags: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'tagModel'
  }],

  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'userModel'
  },

  date: {
    type: Date,
    default: Date.now()
  },

  imageUrl: {
    type: String
  }
})

const PostModel = mongoose.model('postModel', postSchema)

export default PostModel
