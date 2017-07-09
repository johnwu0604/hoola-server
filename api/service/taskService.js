var db = require('../../lib/db')

module.exports = {

    /**
     * Finds a task given an their task_id
     *
     * @param id
     * @param done
     */
    findById: function (id, done) {
        db.query('SELECT * FROM tasks WHERE tasks.task_id = $1', [id], function (err, data) {
            if (err) {
                return console.error('error running query', err)
            }
            return done(data.rows[0])
        })
    },

    findByUserId: function (userId, done) {
        db.query('SELECT * FROM tasks WHERE tasks.user_id = $1', [userId], function (err, data) {
            if (err) {
                return console.error('error running query', err)
            }
            return done(data.rows)
        })
    }

}
