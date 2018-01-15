var notebookController = require('../api/controller/notebookController')

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
  app.get('/notebooks', app.isAuthenticated, function (req, res) {
    notebookController.getUserNotebooks(req, function (notebooks) {
      res.send({
        'user_authenticated': true,
        'notebooks': notebooks
      })
    })
  })

    /**
     * Retrieve a notebook by id for the authenticated user
     */
  app.get('/notebook/:notebook_id', app.isAuthenticated, function (req, res) {
    notebookController.getUserNotebookById(req, function (notebook) {
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
