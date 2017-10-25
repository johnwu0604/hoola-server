var SchemaObject = require('schema-object')

/**
 * Schema for a note object
 */
var Note = new SchemaObject({
    note_id: String,
    user_id: String,
    name: String,
    text: String
})

module.exports = Note
