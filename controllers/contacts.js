const contactRouter = require('express').Router()
const Person = require('../models/person')


contactRouter.post('/api/persons', (req, res) => {
    const body = req.body
    if (!body.name || !body.number){
      
      return res.status(400).json({
        error: "missing name or number"
      })
    }
    
    else if (persons.map(p => {
          
      logger.info(p.name.indexOf(body.name))
  
      return p.name.indexOf(body.name) > 1
    })){
  
        return res.status(400).json({
          error: "name must be unique"
        })
    }
    else{
  
    const person = {
      name: body.name,
      number: body.number,
      id: generateId()
    }
    persons = persons.concat(person)
    res.json(person)
    }
  })

  contactRouter.get('/', (req, res) => {
    Person.find({}).then(persons => {
      res.json(persons.map(person => person.toJSON()))
    })
  })

  contactRouter.get('/:id', (request, response, next) => {

    Person.findById(request.params.id).then(c=> {
      if(c){
        response.json(c.toJSON())
      } else {
        response.status(404).end()  
      }
    })
    .catch(error => {
      logger.info(error)
      response.status(400).send({error: 'malformatted id'})
    })
    .catch(error => next(error))
  })

  contactRouter.delete('/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id).then(reult => response.status(204).end() )
    .catch(error => next(error))
    })


  contactRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number,
  }
  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedContact => {
    response.json(updatedContact.toJSON())
  })
  .catch(error => next(error))
})

contactRouter.get('/info', (req, res, next) => {
  Person.find({}).then(pr => res.send(`Phonebook has info for 
  ${pr.map(p => p).length} people<br></br> ${date = new Date()}
  (Eastern European Standard Time)`))
})

module.exports = contactRouter