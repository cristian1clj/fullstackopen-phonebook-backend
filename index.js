require('dotenv').config()

const express = require('express')
const Person = require('./modules/person')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

app.use(express.static('dist'))

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError'){
    response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError'){
    response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(express.json())
app.use(cors())

morgan.token('body', (req, res) => JSON.stringify(req.body))
app.use(morgan((tokens, req, res) => {
  const msgTokens = [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms'
  ]

  if (tokens.method(req, res) === 'POST'){
    msgTokens.push(tokens.body(req, res))
  }

  return msgTokens.join(' ')
}))

app.get('/api/persons', (req, res) => {
  Person.find({})
    .then(people => {
      res.json(people)
    })
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      if (person){
        res.json(person)
      } else {
        res.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
  const body = req.body

  const newPerson = new Person({
    name: body.name,
    number: body.number
  })

  newPerson.save()
    .then(person => {
      res.json(person)
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body
  const person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(req.params.id, person, { new: true, runValidators: true })
    .then(updatedPerson => {
      res.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

app.get('/api/info', (req, res) => {
  const dateRequest = new Date().toUTCString()
  Person.countDocuments({})
    .then(amount => {
      res.send(`
        <p>Phonebook has info for ${amount} people</p>
        <p>${dateRequest}</p>
      `)
    })
})

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})