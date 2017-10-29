var UUID = require('uuid/v1')
var Task = require('../model/task')
var taskService = require('../service/taskService')

module.exports = {

    /**
     * Retrieve all the tasks for a user
     *
     * @param req
     * @param done
     */
  getUserTasks: function (req, done) {
    taskService.findByUserId(req.user.user_id, function (tasks) {
      return done(tasks)
    })
  },

    /**
     * Add tasks to the user
     *
     * @param req
     * @param done
     */
  addTaskToUser: function (req, done) {
    var task = new Task()
    task.task_id = UUID()
    task.user_id = req.user.user_id
    task.description = req.param('description')
    task.due_date = req.param('due_date')
    taskService.addTask(task, function () {
      taskService.findByUserId(req.user.user_id, function (tasks) {
        return done(tasks)
      })
    })
  },

    /**
     * Delete a task given an id
     *
     * @param task_id
     * @param done
     */
  deleteTask: function (req, done) {
    taskService.deleteTask(req.params.task_id, function () {
      taskService.findByUserId(req.user.user_id, function (tasks) {
        return done(tasks)
      })
    })
  },

    /**
     * Updates a task
     *
     * @param req
     * @param done
     */
  updateTask: function (req, done) {
    taskService.findById(req.params.task_id, function (task) {
      task.description = req.param('description') || task.description
      task.due_date = req.param('due_date') || task.due_date
      taskService.updateTask(task, function () {
        taskService.findByUserId(req.user.user_id, function (tasks) {
          return done(tasks)
        })
      })
    })
  }

}
