const express = require('express')
const router = express.Router()
const Records = require('../models/record')


router.get('/', (req, res) => {
  Records.find((err, records) => {
    if (err) console.log('Load home page err')
    res.render('index', { records: records })
  })
})



module.exports = router