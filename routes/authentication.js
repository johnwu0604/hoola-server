/**
 * Routes for authentication management
 *
 * @param app
 * @param passport
 */
module.exports = function (app, passport) {
    /**
     * Creates a new user and logs them into the portal
     *
     * TODO : Redirect process
     */
  app.post('/signup', passport.authenticate('signup', {
    successRedirect: '/dashboard',
    failureRedirect: '/'
  }))

    /**
     * Logs in a user to the current session using cookies
     */
  app.post('/login', passport.authenticate('login', {
    successRedirect: '/login-success',
    failureRedirect: '/login-failure'
  }))

    /**
     * Logs a user out of the current session using cookies
     */
  app.get('/logout', function (req, res) {
    req.logout()
    res.redirect('/')
  })

    /**
     * Redirect route for a successful login
     */
  app.get('/login-success', app.isAuthenticated, function (req, res) {
    res.status(200).send({
      'login_success': true,
      'user': req.user
    })
  })

    /**
     * Redirect route for a failed login
     */
  app.get('/login-failure', function (req, res) {
    res.status(200).send({
      'login_success': false,
      'user': null
    })
  })

    /**
     * Redirect route for when a user is not authenticated in the current session
     */
  app.get('/unauthenticated', function (req, res) {
    res.status(200).send({ 'user_authenticated': false })
  })

    // Temp endpoints

  app.get('/dashboard', app.isAuthenticated, function (req, res) {
    res.send('Dashboard')
  })

  app.get('/', function (req, res) {
    res.send(200)
  })
}
