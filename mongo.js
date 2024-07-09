const mongoose = require('mongoose')

const password = process.argv[2]
const url = `mongodb+srv://testUser:${password}@cluster0.tlsqaba.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 5){
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
  })

  person.save().then(result => {
    console.log(`added ${person.name} ${person.number} to phonebook`)
    mongoose.connection.close()
  })

} else if (process.argv.length === 3){
  Person.find({}).then(persons => {
    console.log('Phonebook:')
    persons.forEach(person => console.log(`${person.name} ${person.number}`))
    mongoose.connection.close()
  })

} else {
  console.log('Please, make sure that you wrote the necessary params!!!')
  console.log('---> Add new person: < password name number >')
  console.log('---> Show all persons: < password >')
  mongoose.connection.close()
}