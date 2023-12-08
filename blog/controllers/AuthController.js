import userModel from "../models/userModel.js";
import verifyPassword from "../utils/verifyPassword.js"
import crypto from 'crypto'
import transportor from "../utils/sendEmail.js";

export default class AuthController {
    static async register(req, res) {
        const {email, username, password} = req.body

        const dbUser = await userModel.findOne({ $or: [{ username }, { email }]});

        if (dbUser) {
            res.status(400).json({error: 'Username or email is already taken'})
            return
        }

        if (!password) {
            res.status(400).json({error: 'missing password'})
            return
        }

        const verificationToken = {
            token: crypto.randomBytes(32).toString('hex'),
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
        };
        const verification_link = `http://localhost:5000/api/v1/verify/:${verificationToken}`
        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: "Account verification",
            html: `<h1>Click on the link ${verification_link}
            to activate your account</h1>`
        }
        await transportor.sendMail(mailOptions)
        const new_user = await userModel.create({email, username, password, verificationToken: JSON.stringify(verificationToken)})

        res.status(201).json(new_user)
    }

    static async login(req, res) {
        const {username, password} = req.body
        
        const dbUser = await userModel.findOne({username})

        if (!dbUser) {
            res.status(401).json({error: 'invalid credentials'})
            return
        }

        const password_verify = await verifyPassword(password, dbUser.password)

        if (!password_verify) {
            res.status(401).json({error: 'invalid credentials'})
            return
        }

        res.status(200).json({Message: 'success', token: 'token'})

    }

    static async verifyAccount(req, res) {
        const token = req.params.token

        const user = await userModel.findOne({token})

        if (!user) {
            res.status(401).json({error: 'Invalid or expired verifaction token'})
            return
        }

        user.isVerified = true
        user.verificationToken = undefined
        await user.save()

        res.status(200).json({Message: 'email verified successfully'})
    }
}
