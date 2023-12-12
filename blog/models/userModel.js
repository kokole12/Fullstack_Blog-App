import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import Profile from './profile.js'

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true
  },

  username: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  verificationToken: {
    type: String
  },

  profile: {
    type: Profile.Schema,
    default: {}
  }

})

userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt(10)
  const hashed = await bcrypt.hash(this.password, salt)
  this.password = hashed
})

const userModel = mongoose.model('userModel', userSchema)

export default userModel
