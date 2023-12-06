import express from 'express'
import AuthController from '../controllers/AuthController.js'
import { loginValidation, validate, registerValidation } from '../utils/validation.js'

const router = express.Router()

router.post('/api/v1/blog/register', registerValidation, validate, AuthController.register)

router.post('/api/v1/blog/login', AuthController.login)

export default router
