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

    /**
     * Find tasks by user_id
     *
     * @param user_id
     * @param done
     */
  findByUserId: function (user_id, done) {
    db.query('SELECT * FROM tasks WHERE tasks.user_id = $1 ORDER BY due_date ASC', [user_id], function (err, data) {
      if (err) {
        return console.error('error running query', err)
      }
      return done(data.rows)
    })
  },

    /**
     * Adds a task to the database
     *
     * @param task
     * @param done
     */
  addTask: function (task, done) {
    db.query('INSERT INTO tasks (task_id, user_id, description, due_date) VALUES ($1, $2, $3, $4)',
            [task.task_id, task.user_id, task.description, task.due_date], function (err, data) {
              if (err) {
                return console.error('error running query', err)
              }
              return done()
            })
  },

    /**
     * Deletes a task from the database
     *
     * @param user
     * @param done
     */
  deleteTask: function (task_id, done) {
    db.query('DELETE FROM tasks WHERE task_id = $1',
            [task_id], function (err, data) {
              if (err) {
                return console.error('error running query', err)
              }
              return done()
            })
  },

    /**
     * Updates a task with given parameters
     *git
     * @param task
     * @param done
     */
  updateTask: function (task, done) {
    db.query('UPDATE tasks SET description = $1, due_date = $2 WHERE task_id = $3',
           [task.description, task.due_date, task.task_id], function (err, data) {
             if (err) {
               return console.error('error running query', err)
             }
             return done()
           })
  }

}
