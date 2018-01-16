var UUID = require('uuid/v1')
var notebookService = require('../service/notebookService')
var Notebook = require('../model/notebook')

module.exports = {

    /**
     * Retrieve the notebooks for a user
     *
     * @param req
     * @param done
     */
  getUserNotebooks: function (req, done) {
    notebookService.findByUserId(req.user.user_id, function (notebooks) {
      return done(notebooks)
    })
  },

  getUserNotebookById: function (req, done) {
    notebookService.findById(req.params.notebook_id, req.user.user_id, function (notebook) {
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
    notebookService.findById(req.params.notebook_id, req.user.user_id, function (notebook) {
      notebook.name = req.body.name || notebook.name
      notebook.text = req.body.text || notebook.text
      notebookService.updateNotebook(notebook, function () {
        notebookService.findByUserId(req.user.user_id, function (notebook) {
          return done(notebook)
        })
      })
    })
  },

    /**
     * Creates a new notebook
     *
     * @param req
     * @param done
     */
  createNewNotebook: function (req, done) {
    var notebook = new Notebook()
    notebook.notebook_id = UUID()
    notebook.user_id = req.user.user_id
    notebook.name = req.body.name
    notebook.text = req.body.text
    notebookService.createNotebook(notebook, function () {
      notebookService.findByUserId(req.user.user_id, function (notebooks) {
        return done(notebooks)
      })
    })
  },

    /**
     * Delete a notebook given a notebook id
     *
     * @param req
     * @param done
     */
    deleteNotebook: function (req, done) {
        notebookService.deleteNotebook(req.params.notebook_id, req.user.user_id, function () {
            notebookService.findByUserId(req.user.user_id, function (notebooks) {
                return done(notebooks)
            })
        })
    },

}
