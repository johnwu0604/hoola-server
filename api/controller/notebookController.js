var notebookService = require('../service/notebookService')

module.exports = {

    /**
     * Retrieve the notebook for a user
     *
     * @param req
     * @param done
     */
  getUserNotebook: function (req, done) {
    notebookService.findByUserId(req.user.user_id, function (notebook) {
      return done(notebook)
    })
  },

    /**
     * Updates a notebook
     *
     * @param req
     * @param done
     */
  updateNotebook: function (req, done) {
    notebookService.findById(req.params.notebook_id, function (notebook) {
      notebook.name = req.body.name || notebook.name
      notebook.text = req.body.text || notebook.text
      notebookService.updateNotebook(notebook, function () {
        notebookService.findByUserId(req.user.user_id, function (notebook) {
          return done(notebook)
        })
      })
    })
  }

}
