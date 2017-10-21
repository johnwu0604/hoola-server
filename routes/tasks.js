/**
 * Created by JohnWu on 2017-07-09.
 */
var isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) { return next() }
    res.redirect('/unauthorized')
}
var taskController = require('../api/controller/taskController')

module.exports = function (app, passport) {

    app.get('/tasks', function(req,res) {
        taskController.getUserTasks(req, function(tasks) {
            res.send(tasks)
        })
    })

}
