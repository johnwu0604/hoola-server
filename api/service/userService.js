var db = require('../../lib/db');

module.exports = {

    getAllUsers: function() {
        db.query('SELECT * FROM users', [], function(err, data) {
            if(err) {
                return console.error('error running query', err);
            }
            return data;
        });
    },

    getUserById: function(id) {
        db.query('SELECT * FROM users WHERE users.user_id = $1::int', [id], function(err, data) {
            if(err) {
                return console.error('error running query', err);
            }
            return data;
        });
    },

    findOne: function(email, password, done) {
        db.query('SELECT * FROM users WHERE users.email = $1 AND users.password = $2', [email, password], function(err, data) {
           if (err) {
               return console.error('error running query', err);
           }
           return done(data);
        });
    }

};