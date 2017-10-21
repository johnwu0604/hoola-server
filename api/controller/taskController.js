var UUID = require('uuid/v1')
var User = require('../model/user')
var taskService = require('../service/taskService')

module.exports = {

    getUserTasks: function (req, done) {
        taskService.findByUserId(req.user.user_id, function(tasks) {
            return done(tasks)
        })
    }

}