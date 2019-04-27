const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')

// load js and css
app.use('/', express.static('public'))

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/record', { useNewUrlParser: true, useCreateIndex: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('db connect err')
})

db.once('open', () => {
  console.log('db connecting')
})

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({ extended: true }))



app.use('/', require('./routes/home'))
app.use('/records', require('./routes/record'))

app.listen(3000, () => {
  console.log('express running')
})