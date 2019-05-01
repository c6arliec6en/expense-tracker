const express = require('express')
const router = express.Router()
const Records = require('../models/record')
const authenticated = require('../config/auth')

router.get('/new', authenticated, (req, res) => {
  let date = new Date()
  date = date.toISOString().slice(0, 10)
  res.render('new', { date })
})

router.post('/new', authenticated, (req, res) => {
  const { name, category, date, amount } = req.body
  const userId = req.user._id

  errors = []

  if (!name || !category || !date || !amount) {
    errors.push({ message: '所有欄位必填' })
  }

  if (isNaN(parseInt(amount)) === true) {
    errors.push({ message: '金額請輸入數字' })
  }

  if (errors.length > 0) {
    res.render('new', {
      name, category, date, amount, errors
    })
  } else {
    const newRecord = new Records({
      name,
      category,
      date,
      amount,
      userId
    })
    newRecord.save(err => {
      if (err) return console.log(err)
      return res.redirect('/')
    })
  }


})


router.get('/edit/:id', authenticated, (req, res) => {
  Records.findById(req.params.id, (err, record) => {
    if (err) console.log('find id error')
    res.render('edit', { record: record })
  })

})

router.post('/edit/:id', authenticated, (req, res) => {
  Records.findById(req.params.id, (err, record) => {
    if (err) console.log('find id error')

    record.name = req.body.name
    record.date = req.body.date
    record.category = req.body.category
    record.amount = req.body.amount

    record.save()
    return res.redirect('/')
  })

})

router.post('/delete/:id', authenticated, (req, res) => {
  Records.findById(req.params.id, (err, record) => {
    if (err) console.log('delete error')
    record.remove(err => {
      if (err) console.log('delete error')
      return res.redirect('/')
    })
  })
})


module.exports = router