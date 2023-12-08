 import postModel from "../models/postModel.js"

 export default class PostController {
    static async getPosts(req, res) {

        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10;
        const posts = await postModel.find().skip((page - 1) * pageSize).limit(pageSize).exec()
        if (posts.length == 0) {
            res.status(200).json({Message: 'No posts yet'})
            return
        }

        res.status(200).json(posts)
    }

    static async createPost(req, res) {
        const {title, content, slug, tags} = req.body
    }

    static async update(req, res) {

    }

    static async deletePost(req, res) {

    }

    static async createPost(req, res) {

    }

}