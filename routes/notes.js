var isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) { return next() }
    res.redirect('/unauthenticated')
}
var noteController = require('../api/controller/noteController')

/**
 * Routes for notebook management
 *
 * @param app
 * @param passport
 */
module.exports = function (app, passport) {

    /**
     * Retrieve all notebooks for an authenticated user
     */
    app.get('/notebooks', isAuthenticated, function(req,res) {
        noteController.getUserNotePad(req, function(notebooks) {
            res.send({
                "user_authenticated": true,
                "notebooks": notebooks
            })
        })
    })

    /**
     * Updates the notebook of an authenticated user
     */
    app.put('/notebook/:notebook_id', isAuthenticated, function (req, res) {
        noteController.updateNotePad(req, function(notebook) {
            res.status(200).send({
                "user_authenticated": true,
                "notebooks": notebook
            })
        })
    })

}
