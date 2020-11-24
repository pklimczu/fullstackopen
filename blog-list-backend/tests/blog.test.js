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

describe('get tests', () => {
    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body).toHaveLength(initialBlogs.length)
    })

    test('returned blog has id property', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body[0].id).toBeDefined()
    })

    test('blogs are correctly added', async () => {
        const newEntry = {
            title: 'Test title',
            author: 'Romuald',
            url: 'https://sptth.com',
            likes: 3
        }

        await api
            .post('/api/blogs')
            .send(newEntry)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')

        const title = response.body.map(r => r.title)

        expect(response.body).toHaveLength(initialBlogs.length + 1)
        expect(title).toContain(
            newEntry.title
        )
    })
})

describe('post tests', () => {
    test('if likes property is missing, 0 is assigned', async () => {
        const newEntry = {
            title: 'Test title',
            author: 'Romuald',
            url: 'https://sptth.com',
        }

        await api
            .post('/api/blogs')
            .send(newEntry)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')

        const likes = response.body.map(r => r.likes)

        expect(response.body).toHaveLength(initialBlogs.length + 1)
        expect(likes[2]).toBe(0)
    })

    test('if title and url properties are missing, 400 is returned', async () => {
        const newEntry = {
            url: 'https://sptth.com'
        }

        await api
            .post('/api/blogs')
            .send(newEntry)
            .expect(400)
            .expect('Content-Type', /application\/json/)
    })
})

describe('delete method', () => {
    test('entry is deleted', async () => {
        const entries = await helper.blogsInDb()
        const blogToRemove = entries[0]

        await api
            .delete(`/api/blogs/${blogToRemove.id}`)
            .expect(204)

        const response = await helper.blogsInDb()

        expect(response).toHaveLength(initialBlogs.length - 1)
    })
})

describe('put method', () => {
    test('likes are updated', async () => {
        const entries = await helper.blogsInDb()
        const blogToUpdate = entries[0]

        const newEntry = {
            ...blogToUpdate,
            likes: 100
        }

        await api
            .put(`/api/blogs/${newEntry.id}`)
            .send(newEntry)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const response = await helper.blogsInDb()

        const likes = response.map(r => r.likes)

        expect(likes[0]).toBe(100)
    })
})

afterAll(() => {
    mongoose.connection.close()
})