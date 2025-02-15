/* eslint-disable no-undef */
const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connected to', url)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

const entrySchema =  new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        required: true
    },
    number: {
        type: String,
        required: true
    }
})

entrySchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Entry', entrySchema)