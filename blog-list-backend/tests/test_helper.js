const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: 'Fighting 101',
        author: 'Tommy Lee Jones',
        url: 'https://fighting101.com',
        likes: 121
    },
    {
        title: 'A few words about people',
        author: 'Dale Carnegie',
        url: 'https://afewwords.org',
        likes: 10
    }
]

const nonExistingBlog = async () => {
    const blog = new Blog({
        title: 'Python',
        author: 'Sigmund',
        url: 'https://sigmumd.py',
        likes: 101
    })
    await blog.save()
    await blog.remove()

    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogs, nonExistingBlog, blogsInDb
}