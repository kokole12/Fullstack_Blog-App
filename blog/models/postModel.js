import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },

    title: {
        type: String,
        required: true,
        trim: true
    },

    slug: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'slugModel',
        require: true
    },

    tags: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tagModel'
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userModel'
    },
    date: {
        type: Date,
        default: Date.now()
    }
})


const postModel = mongoose.model('postModel', postSchema)

export default postModel
