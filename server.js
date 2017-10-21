// app
var express = require('express')
var app = express()
var port = process.env.PORT || 5000

// parser
var morgan = require('morgan')
var bodyParser = require('body-parser')
var methodOverride = require('method-override')

// passport
var passport = require('passport')
var expressSession = require('express-session')
var initAuthenticationController = require('./api/controller/authenticationController')

// setup
app.use(expressSession({
  secret: 'secret-key',
  resave: true,
  saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({'extended': 'true'}))
app.use(bodyParser.json())
app.use(bodyParser.json({ type: 'application/vnd.api+json' }))
app.use(methodOverride())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
});

initAuthenticationController(passport)

// route files
require('./routes/authentication')(app, passport)
require('./routes/tasks')(app, passport)

// start server
app.listen(port)
console.log('App listing on port ' + port)
