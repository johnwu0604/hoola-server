var db = require('../../lib/db')

module.exports = {

    /**
     * Finds a note pad given an their note_id
     *
     * @param id
     * @param done
     */
    findById: function (id, done) {
        db.query('SELECT * FROM notes WHERE notes.note_id = $1', [id], function (err, data) {
            if (err) {
                return console.error('error running query', err)
            }
            return done(data.rows[0])
        })
    },

    /**
     * Find note pad by user_id
     *
     * @param user_id
     * @param done
     */
    findByUserId: function (user_id, done) {
        db.query('SELECT * FROM notes WHERE notes.user_id = $1', [user_id], function (err, data) {
            if (err) {
                return console.error('error running query', err)
            }
            return done(data.rows[0])
        })
    },


    /**
     * Updates a note pad with given parameters
     *
     * @param note
     * @param done
     */
    updateNote: function (note, done) {
        db.query('UPDATE notes SET name = $1, text = $2 WHERE note_id = $3',
            [note.name, note.text, note.note_id], function (err, data) {
                if (err) {
                    return console.error('error running query', err)
                }
                return done()
            })
    }

}
