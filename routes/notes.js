/**
 * Created by JohnWu on 2017-07-09.
 */
var isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) { return next() }
    res.redirect('/unauthenticated')
}
var noteController = require('../api/controller/noteController')

module.exports = function (app, passport) {

    app.get('/notes', isAuthenticated, function(req,res) {
        noteController.getUserNotePad(req, function(notes) {
            res.send({
                "user_authenticated": true,
                "notes": notes
            })
        })
    })

    app.put('/notes/:note_id', isAuthenticated, function (req, res) {
        noteController.updateNotePad(req, function(notes) {
            res.status(200).send({
                "user_authenticated": true,
                "notes": notes
            })
        })
    })

}
