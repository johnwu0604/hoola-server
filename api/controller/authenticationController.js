var userService = require('../service/userService')
var LocalStrategy = require('passport-local').Strategy
var UUID = require('uuid/v1')
var User = require('../model/user')

/**
 * Controller to manage all authentication operations
 * 
 * @param passport
 */
module.exports = function (passport) {
    /**
     * Serializes the user into the current session upon successful login
     */
    passport.serializeUser(function (user, done) {
      console.log('serializing user: ', user)
      done(null, user.user_id)
    })

    /**
     * De-serializes the user out of the current session after logging out
     */
    passport.deserializeUser(function (id, done) {
      userService.findById(id, function (user) {
        done(null, user)
      })
    })

    /**
     * Login authentication method
     */
    passport.use('login', new LocalStrategy({
      passReqToCallback: true,
      usernameField: 'email',
      passwordField: 'password'
    },
      function (req, email, password, done) {
        userService.findOne(email, password, function (user) {
          if (!user) {
            console.log('User not found with username: ' + email + 'and password:' + password)
            return done(null, false)
          }
          return done(null, user)
        })
      })
    )

    /**
     * User sign up method
     */
    passport.use('signup', new LocalStrategy({
      passReqToCallback: true,
      usernameField: 'email',
      passwordField: 'password'
    },
       function (req, email, password, done) {
          var user = new User()
          user.user_id = UUID()
          user.first_name = req.param('first_name')
          user.last_name = req.param('last_name')
          user.email = email
          user.password = password

          userService.addUser(user, function () {
            userService.findById(user.user_id, function (data) {
              return done(null, data)
            })
          })
        })
    )
}
