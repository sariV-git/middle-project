const Post = require("../models/Post")

const getAllPosts = async (req, res) => {
    const posts = await Post.find().lean()
    if (!posts) {
        return res.status(400).json({ message: "No posts found" })
    }
    res.json(posts)
}

const createNewPost = async (req, res) => {
    const { title, body } = req.body
    if (!title) {
        return res.status(400).json({ message: "title is required" })
    }
    const post = await Post.create({ title, body })
    if (post) {
        // return res.json({ message: "New post created", post: post })
        const posts = await Post.find().lean()
        if (!posts) {
            return res.status(400).json({ message: "No posts found" })
        }
        res.json(posts)
    }
    else {
        return res.status(400).json({ message: "Invalid post" })
    }
}

const updatePost = async (req, res) => {
    const { id, title, body } = req.body
    if (!id || !title) {
        return res.status(400).json({ message: "title and id are required" })
    }
    const post = await Post.findById(id).exec()
    if (!post) {
        return res.status(400).json({ message: "Post no found" })
    }
    post.title = title
    post.body = body
    const updatePost = await post.save()
    const posts = await Post.find().lean()
    if (!posts) {
        return res.status(400).json({ message: "No posts found" })
    }
    res.json(posts)
    // res.json(`"${updatePost.title}"updated`)
}

const deletePost = async (req, res) => {
    const { id } = req.params
    const post = await Post.findById(id).exec()
    if (!post) {
        return res.status(400).json({ message: "Post no found" })
    }
    const result = await post.deleteOne()
    // const reply = `Post ${post.title} Id ${post._id} delete`
    // res.json(reply)
    const posts = await Post.find().lean()
    if (!posts) {
        return res.status(400).json({ message: "No posts found" })
    }
    res.json(posts)
}

module.exports = {
    getAllPosts,
    createNewPost,
    updatePost,
    deletePost
}