require('dotenv').config()
const express = require('express')
var morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')



const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static('build'))

morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :response-time ms - :body'))
let persons = [
    {
        "id": 1,
      "name": "Arto Hellas",
      "number": "040-123456",

    },
    {
        "id": 2,
      "name": "Ada Lovelace",
      "number": "39-44-5323523",

    },
    {
        "id": 3,
      "name": "Dan Abramov",
      "number": "12-43-234345",

    },
    {
        "id": 4,
      "name": "Mary poppendick",
      "number": "39-23-6423122",

    },
  ]



app.get('/', (req, res) => {
    res.send('<h1>Phonebook</h1>')
  })

  app.get('/api/persons', (request, response, next) => {
    Person.find({}).then(person => {
      response.json(person)
    })
    .catch(error => next(error))
  })

  app.get('/info', (req, res, next) => {
    Person.find({}).then(people => {
      const total = people.length
      res.send('<p> <h1>Phonebook has info for '+ total +  ' people</h1></p> <p> <h1>' + new Date() +'</h1></p>')
    })
    .catch(error => next(error))

    
  })


  app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id).then(person => {
      response.json(person)

    })
    .catch(error => next(error))

  })

  app.delete('/api/persons/:id', (request, response, next) => {

      Person.findByIdAndRemove(request.params.id)
      .then(result =>{
        response.status(204).end()
      })
      .catch(error => next(error))


  })

  const generateId = () => {

    return  Math.random(0,2222222222)
  }

  app.post('/api/persons', (request, response) => {


    const body = request.body



    if (!body.name) {
      return response.status(400).json({
        error: 'name missing'
      })
    }

    if(!body.number){
        return response.status(400).json({
            error: 'number missing'
          })
    }

    if(persons.find(n => n.name === body.name)){
        return response.status(400).json({
            error: 'name must be unique'
          })
    }



   const person = new Person({
     name: body.name,
     number: body.number
   })

   person.save().then(savedPerson => {
    response.json(savedPerson)

  })
  .catch(error => next(error))

  })

  app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body

    const person = {
      name: body.name,
      number: body.number
    }
    
    Person.findOneAndUpdate({name: body.name}, person, {new: true})
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
    })

    

  const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }

  app.use(unknownEndpoint)

  const errorHandler = (error, request, response, next) => {
    console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error)

  }

  app.use(errorHandler)



  const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})