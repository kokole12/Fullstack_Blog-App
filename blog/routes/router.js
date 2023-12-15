import express from 'express'
import AuthController from '../controllers/AuthController.js'
import { loginValidation, validate, registerValidation, postCreateValidation } from '../utils/validation.js'
import PostController from '../controllers/postController.js'
import authenticate from '../middlewares/authMiddleware.js'
import UserController from '../controllers/userController.js'
import multer from 'multer'
import fs from 'fs'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = './uploads'
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir)
    }
    cb(null, uploadDir)
  },
  filename: (req, file, cb) => {
    const filename = `${Date.now()}_${file.originalname}`
    cb(null, filename)
  }
})

const upload = multer({ storage })

const router = express.Router()

router.post('/api/v1/blog/register', registerValidation, validate, AuthController.register)

router.post('/api/v1/blog/login', loginValidation, validate, AuthController.login)

router.get('/api/v1/verify/:token', AuthController.verifyAccount)

router.get('/api/v1/blog/posts', PostController.getPosts)

router.post('/api/v1/blog/posts', authenticate, upload.single('image'), postCreateValidation, validate, PostController.createPost)

router.delete('/api/v1/blog/posts/:id', authenticate, PostController.deletePost)

router.put('/api/v1/blog/posts/:id', authenticate, PostController.updatePost)

router.post('/api/v1/blog/posts/:postId/comment', authenticate, PostController.commentPost)

router.get('/api/v1/blog/posts/:postId/comments', authenticate, PostController.getPostComments)

router.post('/api/v1/blog/posts/:postId/like', authenticate, PostController.likePost)

router.get('/api/v1/blog/posts/:postId/likes', authenticate, PostController.getPostLikes)

router.delete('/api/v1/blog/posts/:postId/likes', authenticate, PostController.dislikePost)

router.put('/api/v1/blog/users/profile', authenticate, upload.single('image'), UserController.updateUserProfile)

router.get('/api/v1/blog/posts/search', PostController.search)

export default router
