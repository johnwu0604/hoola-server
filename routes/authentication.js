var isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) { return next() }
  res.redirect('/')
}

module.exports = function (app, passport) {
  app.post('/signup', passport.authenticate('signup', {
    successRedirect: '/dashboard',
    failureRedirect: '/'
  }))

  app.post('/login', passport.authenticate('login', {
    successRedirect: '/login-success',
    failureRedirect: '/login-failure'
  }))

  app.get('/logout', function (req, res) {
    req.logout()
    res.redirect('/')
  })

  app.get('/login-success', isAuthenticated, function (req, res) {
      res.send({
        'loginSuccess': true,
        'user': req.user
      })
  })

  app.get('/login-failure', function (req, res) {
      res.send({
          'loginSuccess': false,
          'user': null
      })
  })

    // Temp endpoint since dashboard api's have not been made yet
  app.get('/dashboard', isAuthenticated, function (req, res) {
    res.send('Dashboard')
  })

  app.get('/', function (req, res) {
    res.send('Home page')
  })
}
