const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const User = require('../models/user')

beforeEach(async () => {
    await User.deleteMany({})
})

describe('basic user operations', () => {
    test('an user can be added', async () => {
        const user = {
            username: "adas",
            user: "Adam Mickiewicz",
            password: "litwoojczyznomoja13"
        }

        await api
            .post('/api/users')
            .send(user)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/users')
        expect(response.body).toHaveLength(1)
    })
})