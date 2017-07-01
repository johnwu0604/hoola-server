var db = require('../../lib/db');

module.exports = {


    /**
     * Finds a user given an their user_id
     *
     * @param id
     * @param done
     */
    findById: function(id, done) {
        db.query('SELECT * FROM users WHERE users.user_id = $1', [id], function(err, data) {
            if(err) {
                return console.error('error running query', err);
            }
            return done(data.rows[0]);
        });
    },

    /**
     * Finds one distinct user given their email and password
     *
     * @param email
     * @param password
     * @param done
     */
    findOne: function(email, password, done) {
        db.query('SELECT * FROM users WHERE users.email = $1 AND users.password = $2', [email, password], function(err, data) {
           if (err) {
               return console.error('error running query', err);
           }
           return done(data.rows[0]);
        });
    },

    /**
     * Adds a user to the database
     *
     * @param user
     * @param done
     */
    addUser: function(user, done) {
        db.query('INSERT INTO users (user_id, first_name, last_name, email, password) VALUES ($1, $2, $3, $4, $5)',
            [user.user_id, user.first_name, user.last_name, user.email, user.password], function(err, data) {

            if (err) {
                return console.error('error running query', err);
            }
            return done();
        })
    }

};