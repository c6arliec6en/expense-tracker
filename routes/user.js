const express = require('express')
const router = express.Router()
const passport = require('passport')
const User = require('../models/user')
const bcrypt = require('bcryptjs')



router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
  })(req, res, next)
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body

  let errors = []

  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: '全部欄位都必填' })
  }

  if (password !== confirmPassword) {
    errors.push({ message: '請確認密碼是否輸入正確' })
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      confirmPassword,
    })
  } else {
    User.findOne({ email: req.body.email }, (err, user) => {
      if (err) console.log('Register page error')
      if (user) {
        errors.push({ message: '此E-mail已存在' })
        res.render('register', { errors, name, email, password, confirmPassword })
      } else {
        const newUser = new User({
          name, email, password
        })

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err
            newUser.password = hash
            newUser.save().then(user => {
              res.render('login', { user: user })
            }).catch(err)
          })
        })
      }

    })
  }

})

router.post('/logout', (req, res) => {
  req.flash('success_msg', '成功登出')
  req.logout()
  res.redirect('/users/login')
})

module.exports = router