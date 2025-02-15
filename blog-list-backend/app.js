/* eslint-disable no-undef */
const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
require('dotenv').config()
const app = express()
const cors = require('cors')

const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const blogsRouter = require('./controllers/blogs')

const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(() => {
        logger.info('connected to MongoDB')
    })
    .catch((error) => {
        logger.error('error connecting to MongoDB:', error.message)
    })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)
app.use('/api/blogs', blogsRouter)

if (process.env.NODE_ENV === 'test') {
    console.log('testingRouter is added')
    const testingRouter = require('./controllers/test')
    app.use('/api/testing', testingRouter)
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app







