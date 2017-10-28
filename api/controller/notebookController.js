var UUID = require('uuid/v1')
var Notebook = require('../model/notebook')
var notebookService = require('../service/notebookService')

module.exports = {

    /**
     * Retrieve the notebook for a user
     *
     * @param req
     * @param done
     */
    getUserNotebook: function (req, done) {
        notebookService.findByUserId(req.user.user_id, function(notebook) {
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
        notebookService.findById(req.params.notebook_id, function(note) {
            note.name = req.param('name') || note.name
            note.text = req.param('text') || note.text
            notebookService.updateNotebook(note, function() {
                notebookService.findByUserId(req.user.user_id, function(notebook) {
                    return done(notebook)
                })
            })
        })
    }

}