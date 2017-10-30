var db = require('../../lib/db')

module.exports = {

    /**
     * Finds a notebook given their note_id
     *
     * @param id
     * @param done
     */
  findById: function (id, done) {
    db.query('SELECT * FROM notebooks WHERE notebooks.notebook_id = $1', [id], function (err, data) {
      if (err) {
        return console.error('error running query', err)
      }
      return done(data.rows[0])
    })
  },

    /**
     * Find notebook by user_id
     *
     * @param userId
     * @param done
     */
  findByUserId: function (userId, done) {
    db.query('SELECT * FROM notebooks WHERE notebooks.user_id = $1', [userId], function (err, data) {
      if (err) {
        return console.error('error running query', err)
      }
      return done(data.rows[0])
    })
  },

    /**
     * Updates a notebook with given parameters
     *
     * @param notebook
     * @param done
     */
  updateNotebook: function (notebook, done) {
    db.query('UPDATE notebooks SET name = $1, text = $2 WHERE notebook_id = $3',
            [notebook.name, notebook.text, notebook.notebook_id], function (err, data) {
              if (err) {
                return console.error('error running query', err)
              }
              return done()
            })
  }

}
