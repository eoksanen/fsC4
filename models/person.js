const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator');
const config = require('../utils/config')

const contactSchema = new mongoose.Schema({      
  name: { type: String, required: true, unique: true, minlength: 3 },
  number: { type: String, index: true, unique: true, required: true, minlength: 8 }
})

  // Apply the uniqueValidator plugin to userSchema.
  contactSchema.plugin(uniqueValidator);

contactSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Contact', contactSchema)