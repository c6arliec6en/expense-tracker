const express = require('express')
const router = express.Router()
const Records = require('../models/record')


router.get('/edit/:id', (req, res) => {
  Records.findById(req.params.id, (err, record) => {
    if (err) console.log('find id error')
    res.render('edit', { record: record })
  })

})

router.post('/edit/:id', (req, res) => {
  console.log(req.body)
  Records.findById(req.params.id, (err, record) => {
    if (err) console.log('find id error')
    res.render('edit', { record: record })
  })

})


module.exports = router