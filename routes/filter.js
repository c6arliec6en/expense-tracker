const express = require('express')
const router = express.Router()
const Records = require('../models/record')

router.get('/', (req, res, next) => {
  let month = req.query.month || false
  let category = req.query.category || { $exists: true }

  Records.find({ category: category, userId: req.user._id }, (err, records) => {
    if (err) return console.log('category filter err')
    records = records.filter(record => {
      if (month) {
        return record.date.slice(5, 7) === month
      }
      return true
    })
    res.render('index', { records, month, category })
  })
})

module.exports = router