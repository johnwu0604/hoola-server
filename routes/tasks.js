var taskController = require('../api/controller/taskController')

/**
 * Routes for task management
 *
 * @param app
 * @param passport
 */
module.exports = function (app, passport) {
    /**
     * Retrieves all tasks for the authenticated user
     */
  app.get('/tasks', app.isAuthenticated, function (req, res) {
    taskController.getUserTasks(req, function (tasks) {
      res.send({
        'user_authenticated': true,
        'tasks': tasks
      })
    })
  })

    /**
     * Adds a tasks to the authenticated user
     */
  app.post('/task', app.isAuthenticated, function (req, res) {
    taskController.addTaskToUser(req, function (tasks) {
      res.status(200).send({
        'user_authenticated': true,
        'tasks': tasks
      })
    })
  })

    /**
     * Updates a given task for an authenticated user
     */
  app.put('/task/:task_id', app.isAuthenticated, function (req, res) {
    taskController.updateTask(req, function (tasks) {
      res.status(200).send({
        'user_authenticated': true,
        'tasks': tasks
      })
    })
  })

    /**
     * Deletes a given task for an authenticated user
     */
  app.delete('/task/:task_id', app.isAuthenticated, function (req, res) {
    taskController.deleteTask(req, function (tasks) {
      res.status(200).send({
        'user_authenticated': true,
        'tasks': tasks
      })
    })
  })
}
