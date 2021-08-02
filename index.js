const express = require('express')

var morgan = require('morgan')
const cors = require('cors')



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
  
  app.get('/api/persons', (req, res) => {
    res.json(persons)
  })

  app.get('/info', (req, res) => {
    res.send('<p> <h1>Phonebook has info for '+ persons.length +  ' people</h1></p> <p> <h1>' + new Date() +'</h1></p>')
  })
  

  app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const number = persons.find(n => n.id === id)
    
    if (number) {
        response.json(number.number)
      } else {
        response.status(404).end()
      }

  })

  app.delete('/api/persons/:id', (request, response) => {
      
      
    const id = Number(request.params.id)
    persons = persons.filter(n => n.id !== id)
  
    response.status(204).end()
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
  


    const person = {
        id: generateId(),
        name: body.name,
        number: body.number
      
    }
  
    persons = persons.concat(person)
  
    response.json(person)
  })



  const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})