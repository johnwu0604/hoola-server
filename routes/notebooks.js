var notebookController = require('../api/controller/notebookController')

/**
 * Routes for notebook management
 *
 * @param app
 * @param passport
 */
module.exports = function (app, passport) {
    /**
     * Retrieve notebook for an authenticated user
     */
  app.get('/notebook', app.isAuthenticated, function (req, res) {
    notebookController.getUserNotebook(req, function (notebook) {
      res.send({
        'user_authenticated': true,
        'notebook': notebook
      })
    })
  })

    /**
     * Updates the notebook of an authenticated user
     */
  app.put('/notebook/:notebook_id', app.isAuthenticated, function (req, res) {
    notebookController.updateNotebook(req, function (notebook) {
      res.status(200).send({
        'user_authenticated': true,
        'notebook': notebook
      })
    })
  })
}
