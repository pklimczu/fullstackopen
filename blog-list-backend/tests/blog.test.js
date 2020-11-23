const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const { initialBlogs } = require('./test_helper')

beforeEach(async () => {
    await Blog.deleteMany({})

    const promises = helper.initialBlogs
        .map(blog => new Blog(blog))
        .map(blog => blog.save())
    await Promise.all(promises)

})

test('all blogs are returned', async () => {
    const resposne = await api.get('/api/blogs')

    expect(resposne.body).toHaveLength(initialBlogs.length)
})

afterAll(() => {
    mongoose.connection.close()
})