const express = require('express')
const router = express.Router()
const Records = require('../models/record')


router.get('/category/:category', (req, res) => {
  Records.find({ category: req.params.category, userId: req.user._id }, (err, records) => {
    if (err) return console.log('category filter err')
    res.render('index', { records: records })
  })
})

router.get('/month/:month', (req, res) => {
  const month = req.params.month
  Records.find({ userId: req.user._id }, (err, records) => {
    if (err) return console.log('month filter err!')
    const recordChoose = records.filter(record => {
      return month === record.date.substring(5, 7)
    })
    res.render('index', { records: recordChoose, month })
  })
})

router.get('/', (req, res) => {
  const month = req.query.month
  const category = req.query.category
  Records.find({ category: category, userId: req.user._id }, (err, records) => {
    if (err) return console.log('category filter err')
    res.render('index', { records, month, category })
  })

  // console.log(req.query)
  // res.render('index', { month, category })
})

module.exports = router