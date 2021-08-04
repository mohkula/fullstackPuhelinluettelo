const mongoose = require('mongoose')




// eslint-disable-next-line
const password = process.argv[2]
// eslint-disable-next-line
const personName = process.argv[3]
// eslint-disable-next-line
const personNumber = process.argv[4]

const url =
  `mongodb+srv://fullstack:${password}@cluster0.bgklv.mongodb.net/Puhelinnumerot?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const PersonSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', PersonSchema)
// eslint-disable-next-line
if (process.argv.length ===3){
  console.log('Phonebook:')
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })

}
else{


  const person = new Person({
    name: personName,
    number: personNumber
  })
  // eslint-disable-next-line
  person.save().then(response => {
    console.log('added', personName, 'number', personNumber, 'to phonebook')
    mongoose.connection.close()
  })
}