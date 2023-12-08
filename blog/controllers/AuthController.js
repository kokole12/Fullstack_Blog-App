/* eslint-disable no-unused-vars */
import userModel from '../models/userModel.js'
import verifyPassword from '../utils/verifyPassword.js'
import crypto from 'crypto'
import transportor from '../utils/sendEmail.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export default class AuthController {
  static async register (req, res) {
    const { email, username, password } = req.body

    const dbUser = await userModel.findOne({ $or: [{ username }, { email }] })

    if (dbUser) {
      res.status(400).json({ error: 'Username or email is already taken' })
      return
    }

    if (!password) {
      res.status(400).json({ error: 'missing password' })
      return
    }

    const verificationToken = {
      token: crypto.randomBytes(32).toString('hex'),
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
    }
    // eslint-disable-next-line no-unused-vars
    const verificationLink = `http://localhost:5000/api/v1/verify/:${verificationToken}`
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Account verification',
      html: `<h1>Click on the link ${verificationLink}
            to activate your account</h1>`
    }
    // await transportor.sendMail(mailOptions)
    const newUser = await userModel.create({ email, username, password, verificationToken: JSON.stringify(verificationToken) })

    res.status(201).json(newUser)
  }

  static async login (req, res) {
    const { username, password } = req.body

    try {
      const dbUser = await userModel.findOne({ username })

      if (!dbUser) {
        res.status(401).json({ error: 'invalid credentials' })
        return
      }

      const passwordVerify = await verifyPassword(password, dbUser.password)

      if (!passwordVerify) {
        res.status(401).json({ error: 'invalid credentials' })
        return
      }

      const payload = {
        userId: dbUser._id,
        username: dbUser.username
      }
      const token = jwt.sign(
        payload,
        process.env.SECRET,
        { expiresIn: process.env.EXPIRES })
      res.status(200).json({ Message: 'success', token, type: 'Bearer' })
    } catch (error) {
      console.log(error)
      res.status(400).json({ error: 'invalid login' })
    }
  }

  static async verifyAccount (req, res) {
    const token = req.params.token

    const user = await userModel.findOne({ token })

    if (!user) {
      res.status(401).json({ error: 'Invalid or expired verifaction token' })
      return
    }

    user.isVerified = true
    user.verificationToken = undefined
    await user.save()

    res.status(200).json({ Message: 'email verified successfully' })
  }
}
