import express from 'express'
import AuthController from '../controllers/AuthController.js'
import { loginValidation, validate, registerValidation } from '../utils/validation.js'
import PostController from '../controllers/postController.js'
import authenticate from '../middlewares/authMiddleware.js'

const router = express.Router()

router.post('/api/v1/blog/register', registerValidation, validate, AuthController.register)

router.post('/api/v1/blog/login', AuthController.login)

router.get('/api/v1/verify/:token', AuthController.verifyAccount)

router.get('/api/v1/blog/posts', authenticate, PostController.getPosts)
export default router
