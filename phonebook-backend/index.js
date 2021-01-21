/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
require('dotenv').config()
const express = require('express')
const app = express()
const Entry = require('./models/entry')

app.use(express.json())

// Logging configuration
const morgan = require('morgan')
app.use(morgan('tiny', {
    skip: (req) => { return req.method === 'POST' }
}))

// Detailed logging of POST
morgan.token('content', (req) => {
    return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :response-time ms :content', {
    skip: (req) => { return req.method !== 'POST' }
}))

// CORS
const cors = require('cors')
app.use(cors())

// Using static build of frontend
app.use(express.static('build'))

// HANDLERS
app.get('/', (request, response) => {
    response.redirect('/api/persons')
})

app.get('/api/persons', (request, response, next) => {
    Entry.find({}).then(entries => {
        response.json(entries)
    })
        .catch(error => next(error))
})

app.get('/info', (request, response, next) => {
    Entry.find({}).then(entries => {
        const size = entries.length
        const date = (new Date()).toString()
        response.send(`Phonebook has info for ${size} people.<br/>${date}`)
    })
        .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
    Entry.findById(request.params.id).then(entry => {
        if (entry) {
            response.json(entry)
        } else {
            response.status(404).end()
        }
    })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    Entry.findByIdAndDelete(request.params.id).then(() => {
        response.status(204).end()
    })
        .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    Entry.find({})
        .then(entries => {
            let index = entries.findIndex(person => person.name === body.name)
            if (index === -1)
                return true
            else
                throw 'name must be unique'
        })
        .then(() => {
            const person = new Entry({
                name: body.name,
                number: body.number
            })

            return person.save()
        })
        .then(savedPerson => {
            return response.json(savedPerson)
        })
        .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body

    const entry = {
        name: body.name,
        number: body.number
    }

    Entry.findByIdAndUpdate(request.params.id, entry, { new: true })
        .then(updatedEntry => {
            response.json(updatedEntry)
        })
        .catch(error => next(error))
})

// Error handlers
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.log(error)

    if (error.name === 'CastError') {
        return response.status(400).send({ error_msg: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error_msg: error.message })
    } else {
        return response.status(400).json({ error_msg: error })
    }
}
app.use(errorHandler)

// Run
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
