import PostModel from '../models/postModel.js'
import slugModel from '../models/slugModel.js'
import tagModel from '../models/tagModel.js'
import slugify from 'slugify'

export default class PostController {
  static async getPosts (req, res) {
    const page = parseInt(req.query.page) || 1
    const pageSize = parseInt(req.query.pageSize) || 10
    const posts = await PostModel.find().skip((page - 1) * pageSize).limit(pageSize).exec()
    if (posts.length === 0) {
      res.status(200).json({ Message: 'No posts yet' })
      return
    }

    res.status(200).json(posts)
  }

  static async createPost (req, res) {
    const { title, content, tags } = req.body

    const slugValue = slugify(title, { lower: true })

    try {
      let slug = await slugModel.findOne({ value: slugValue })

      if (!slug) {
        slug = await slugModel.create({ value: slugValue })
      }

      const tagObjects = await Promise.all(
        tags.map(async (tagValue) => {
          let tag = await tagModel.findOne({ value: tagValue })

          if (!tag) {
            tag = await tagModel.create({ value: tagValue })
          }

          return tag._id
        })
      )

      const newPost = new PostModel({
        title,
        content,
        slug: slug._id,
        tags: tagObjects,
        author: req.user.userId
      })

      await newPost.save()
      res.status(201).json({ message: 'Post created successfully', post: newPost })
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }

  static async update (req, res) {

  }

  static async deletePost (req, res) {

  }

  static async search (req, res) {

  }
}
