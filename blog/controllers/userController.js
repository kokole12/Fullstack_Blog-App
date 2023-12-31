import UserModel from '../models/userModel.js'

export default class UserController {
  static async updateUserProfile (req, res) {
    const { firstname, lastname, bio } = req.body
    const profileFilename = req.file ? req.file.filename : null
    const userId = req.user.userId

    const updateProfile = {
      firstname,
      lastname,
      bio,
      profileFilename
    }

    try {
      await UserModel.findByIdAndUpdate(userId, { profile: updateProfile })

      res.status(200).json({ message: 'Profile updated successfully' })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }
}
