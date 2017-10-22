/**
 * Created by JohnWu on 2017-07-09.
 */
var isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) { return next() }
    res.redirect('/unauthenticated')
}
var taskController = require('../api/controller/taskController')

module.exports = function (app, passport) {

    app.get('/tasks', isAuthenticated, function(req,res) {
        taskController.getUserTasks(req, function(tasks) {
            res.send({
                "user_authenticated": true,
                "tasks": tasks
            })
        })
    })

    app.post('/task', isAuthenticated, function (req, res) {
        taskController.addTaskToUser(req, function() {
            taskController.getUserTasks(req, function(tasks) {
                res.status(200).send({
                    "user_authenticated": true,
                    "tasks": tasks
                })
            })
        })
    })

}
