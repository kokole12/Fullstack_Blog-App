import PostModel from '../models/postModel.js'
import slugModel from '../models/slugModel.js'
import tagModel from '../models/tagModel.js'
import slugify from 'slugify'
import Comment from '../models/commentsModel.js'

export default class PostController {
  static async getPosts (req, res) {
    const page = parseInt(req.query.page) || 1
    const pageSize = parseInt(req.query.pageSize) || 10
    const posts = await PostModel.find()
      .populate('slug')
      .populate('author')
      .skip((page - 1) * pageSize)
      .limit(pageSize).exec()
    if (posts.length === 0) {
      res.status(200).json({ Message: 'No posts yet' })
      return
    }

    res.status(200).json(posts)
  }

  static async createPost (req, res) {
    const { title, content, tags } = req.body

    const slugValue = slugify(title, { lower: true })

    const imageFilename = req.file ? req.file.filename : null

    try {
      let slug = await slugModel.findOne({ value: slugValue })

      if (!slug) {
        slug = await slugModel.create({ value: slugValue })
      }

      const tagObjects = await Promise.all(
        Array.isArray(tags)
          ? tags.map(async (tagValue) => {
            let tag = await tagModel.findOne({ value: tagValue })

            if (!tag) {
              tag = await tagModel.create({ value: tagValue })
            }

            return tag._id
          })
          : []
      )
      const newPost = new PostModel({
        title,
        content,
        slug: slug._id,
        tags: tagObjects,
        author: req.user.userId,
        imageUrl: imageFilename
      })

      await newPost.save()
      res.status(201).json({ message: 'Post created successfully', post: newPost })
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }

  static async updatePost (req, res) {
    const userId = req.user.userId
    const postId = req.params.id

    const { title, content, tags } = req.body

    try {
      const post = await PostModel.findOne({ _id: postId })

      if (!post) {
        res.status(404).json({ error: 'No post found' })
        return
      }

      if (post.author.toString() !== userId) {
        res.status(401).json({ error: 'You can\'t perform this action' })
        return
      }

      const updatedPost = await PostModel.findByIdAndUpdate(
        postId,
        { $set: { title, content, tags } },
        { new: true }
      )

      res.json({ Message: 'Success', updatedPost })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }

  static async deletePost (req, res) {
    const userId = req.user.userId
    const postId = req.params.id

    try {
      const post = await PostModel.findOne({ _id: postId })

      if (!post) {
        res.status(404).json({ error: 'No post found' })
        return
      }
      if (post.author.toString() !== userId) {
        res.status(401).json({ error: 'You can\'t perform this action' })
        return
      }

      await PostModel.deleteOne({ _id: postId })
      res.status(204).json({ Message: 'Success' })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }

  static async search (req, res) {

  }

  static async commentPost (req, res) {
    const { text } = req.body
    const postId = req.params.postId

    try {
      const post = await PostModel.findOne({ _id: postId })

      if (!post) {
        res.status(404).json({ error: 'No post found' })
        return
      }

      const newComment = new Comment({
        text,
        post: postId,
        author: req.user.userId
      })

      const savedComment = await newComment.save()

      post.comments.push(savedComment._id)
      res.status(201).json(savedComment)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }

  static async getPostComments (req, res) {
    const postId = req.params.postId

    try {
      const post = await PostModel.findById(postId).populate('comments')
      if (!post) {
        res.status(404).json({ error: 'No post found' })
        return
      }

      res.status(200).json(post.comments)
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }
}
