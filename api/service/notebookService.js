var db = require('../../lib/db')

module.exports = {

    /**
     * Finds a notebook given their note_id
     *
     * @param id
     * @param done
     */
  findById: function (id, userId, done) {
    db.query('SELECT * FROM notebooks WHERE notebooks.notebook_id = $1 AND notebooks.user_id = $2', [id, userId], function (err, data) {
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
  },

    /**
     * Creates a new notebook given parameters
     *
     * @param notebook
     * @param done
     */
  createNotebook: function (notebook, done) {
    db.query('INSERT INTO notebooks (notebook_id, user_id, name, text) VALUES ($1, $2, $3, $4)',
          [notebook.notebook_id, notebook.user_id, notebook.name, notebook.text], function (err, data) {
            if (err) {
              return console.error('error running query', err)
            }
            return done()
          })
  }

}
