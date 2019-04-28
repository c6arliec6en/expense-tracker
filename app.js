const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const passport = require('passport')
const session = require('express-session')
const flash = require('connect-flash')
const hbsHelper = require('handlebars-helpers')

if (process.env.NODE_ENV !== 'production') {      // 如果不是 production 模式
  require('dotenv').config()                      // 使用 dotenv 讀取 .env 檔案
}


app.use(flash())

app.use(session({
  secret: 'great',
  resave: 'false',
  saveUninitialized: 'false',
}))
app.use(passport.initialize())
app.use(passport.session())

require('./config/passport')(passport)

// load js and css
app.use('/', express.static('public'))

const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/record', { useNewUrlParser: true, useCreateIndex: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('db connect err')
})

db.once('open', () => {
  console.log('db connecting')
})


app.use((req, res, next) => {
  res.locals.user = req.user
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})


app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({ extended: true }))


app.use('/', require('./routes/home'))
app.use('/records', require('./routes/record'))
app.use('/users/', require('./routes/user'))
app.use('/filter', require('./routes/filter'))
app.use('/auth', require('./routes/auths'))

app.listen(process.env.PORT || 3000, () => {
  console.log('express running')
})