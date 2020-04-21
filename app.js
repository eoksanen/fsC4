
const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const contactsRouter = require('./controllers/contacts')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

const morgan = require('morgan')

morgan.token('body', function getBody (req) {
  return JSON.stringify( req.body )
})

mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true);

logger.info('connecting to', config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.info('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


app.use('/api/persons', contactsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app