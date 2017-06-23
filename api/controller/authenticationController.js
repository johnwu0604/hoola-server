var userService = require('../service/userService');

module.exports = {

    authenticateLogin: function(email, password, done) {
        userService.findOne(email, password, function(data) {
           return done(data);
        });
    }

};