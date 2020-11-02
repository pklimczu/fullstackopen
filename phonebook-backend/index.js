const { request, response } = require('express');
const express = require('express');
const app = express();

app.use(express.json())

const morgan = require('morgan')
app.use(morgan('tiny', {
  skip: (req, res) => { return req.method === "POST" }
}))

// Detailed logging of POST
morgan.token('content', (req) => {
  return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :response-time ms :content', {
  skip: (req, res) => { return req.method !== "POST" }
}))

let phonebook = {
  persons: [
    {
      name: "Arto Hellas",
      number: "040-123456",
      id: 1,
    },
    {
      name: "Ada Lovelace",
      number: "39-44-5323523",
      id: 2,
    },
    {
      name: "Dan Abramov",
      number: "12-43-234345",
      id: 3,
    },
    {
      name: "Mary Poppendieck",
      number: "39-23-6423122",
      id: 4,
    }
  ]
};

app.get("/", (request, response) => {
  response.send(`<h1>Hello World!</h1>`);
});

app.get("/api/persons", (request, response) => {
    response.json(phonebook.persons)
})

app.get("/info", (request, response) => {
    const phonebookSize = phonebook.persons.length
    const date = (new Date()).toString()
    response.send(`Phonebook has info for ${phonebookSize} people.<br/>${date}`)
})

app.get("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id)
    const person = phonebook.persons.find(person => person.id == id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id)
  phonebook.persons = phonebook.persons.filter(person => person.id !== id)

  response.status(204).end()
})

const generateId = () => {
  return Math.floor(Math.random() * 10000)
}

const isNameDuplicated = (name) => {
  const isDuplicated = phonebook.persons.findIndex(person => person.name === name)
  return isDuplicated === -1
} 

app.post("/api/persons", (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'content missing'
    })
  }

  if (!isNameDuplicated(body.name)) {
    return response.status(400).json({
      error: 'name must be unique'
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId()
  }

  phonebook.persons = phonebook.persons.concat(person)

  response.json(person)
})

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
