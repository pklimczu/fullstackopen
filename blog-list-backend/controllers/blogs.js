/* eslint-disable no-undef */
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user')

    return response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!request.token || !decodedToken.id) {
        return response.status(401).json({ 'error': 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)

    const blogContent = {
        ...request.body,
        author: user.username,
        user: user._id
    }

    const blog = new Blog(blogContent)
    const result = await blog.save()
    user.blogs = user.blogs.concat(blog._id)
    await user.save()

    return response.status(201).json(result)
})

blogsRouter.delete('/:id', async (request, response) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!request.token || !decodedToken.id) {
        return response.status(401).json({ 'error': 'token missing or invalid' })
    }
    const blog = await Blog.findById(request.params.id)

    if (blog.user.toString() !== decodedToken.id.toString())
        return response.status(401).json({ 'error': 'user is not authorized' })

    await Blog.findByIdAndRemove(request.params.id)
    return response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body

    const blog = {
        ...body,
        likes: body.likes
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    return response.status(200).json(updatedBlog)
})

module.exports = blogsRouter