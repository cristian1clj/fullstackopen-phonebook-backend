require('dotenv').config()

const express = require('express')
const Person = require('./modules/person')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('dist'))

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

app.get('/api/persons/:id', (req, res) => {
  Person.findById(req.params.id)
    .then(person => {
      if (person){
        res.json(person)
      } else {
        res.status(404).end()
      }
    })
    .catch(error => {
      console.log(error)
      express.response.status(500).end()
    })
})

app.post('/api/persons', (req, res) => {
  const body = req.body

  if (!body.name || !body.number || body.name === '' || body.number === ''){
    return res.status(400).json({
      error: "content missing"
    })
  }

  const newPerson = new Person({
    name: body.name,
    number: body.number
  })
  
  newPerson.save().then(person => {
    res.json(person)
  })
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(person => person.id !== id)
  res.status(204).end()
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})