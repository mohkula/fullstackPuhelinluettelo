const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator')

// eslint-disable-next-line
const url = process.env.MONGODB_URI

console.log('connecting to', url)
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
// eslint-disable-next-line
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const PersonSchema = new mongoose.Schema({
  name:
    {
      type: String,
      unique: true,
      minlength: 3
    },
  number:
    {
      type: String,
      minlength: 8
    }
})
PersonSchema.plugin(uniqueValidator)

PersonSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', PersonSchema)