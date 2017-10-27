var UUID = require('uuid/v1')
var Note = require('../model/note')
var noteService = require('../service/noteService')

module.exports = {

    /**
     * Retrieve the note pad for a user
     *
     * @param req
     * @param done
     */
    getUserNotePad: function (req, done) {
        noteService.findByUserId(req.user.user_id, function(note) {
            return done(note)
        })
    },


    /**
     * Updates a notepad
     *
     * @param req
     * @param done
     */
    updateNotePad: function (req, done) {
        noteService.findById(req.params.notebook_id, function(note) {
            note.name = req.param('name') || note.name
            note.text = req.param('text') || note.text
            noteService.updateNote(note, function() {
                noteService.findByUserId(req.user.user_id, function(note) {
                    return done(note)
                })
            })
        })
    }

}