const express = require('express')
const router = express.Router()
const Records = require('../models/record')
const authenticated = require('../config/auth')


router.get('/', authenticated, (req, res) => {
  Records.find({ userId: req.user._id }, (err, records) => {
    if (err) console.log('Load home page err')
    res.render('index', { records: records })
  })
})



module.exports = router