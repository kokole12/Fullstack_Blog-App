import mongoose from 'mongoose'

const profileScheme = new mongoose.Schema({
  firstname: {
    type: String,
    trim: true
  },

  lastname: {
    type: String,
    tirm: true
  },

  bio: {
    type: String,
    default: ''
  },

  profilePicture: {
    type: String
  }
})

const Profile = mongoose.model('Profile', profileScheme)

export default Profile
