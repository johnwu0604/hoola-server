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
        taskService.findByUserId(req.user.user_id, function(tasks) {
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
        taskService.addTask(task, function() {
            return done()
        })
    },

    /**
     * Delete a task given an id
     *
     * @param task_id
     * @param done
     */
    deleteTask: function (task_id, done) {
        taskService.deleteTaskById(task_id, function() {
            return done()
        })
    }

}