function authenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  console.log(req)
  req.flash('warning_msg', '請先登入')
  res.redirect('/users/login')
}

module.exports = authenticated