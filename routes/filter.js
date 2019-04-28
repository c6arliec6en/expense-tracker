const express = require('express')
const router = express.Router()
const Records = require('../models/record')


router.get('/category/:category', (req, res) => {
  Records.find({ category: req.params.category }, (err, records) => {
    if (err) return console.log('category filter err')

    res.render('index', { records: records })
  })
})

router.get('/month/:month', (req, res) => {
  const month = req.params.month
  Records.find((err, records) => {
    if (err) return console.log('month filter err!')

    const recordChoose = records.filter(record => {
      return month === record.date.substring(5, 7)
    })
    res.render('index', { records: recordChoose })
  })
})

module.exports = router