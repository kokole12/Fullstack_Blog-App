import userModel from "../models/userModel.js";
import {check, validationResult} from 'express-validator'
import bcrypt from 'bcryptjs'
import verifyPassword from "../utils/verifyPassword.js";

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

        const new_user = await userModel.create({email, username, password})

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
}
