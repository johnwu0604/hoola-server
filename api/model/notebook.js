var SchemaObject = require('schema-object')

/**
 * Schema for a notebook object
 */
var Notebook = new SchemaObject({
  notebook_id: String,
  user_id: String,
  name: String,
  text: String
})

module.exports = Notebook
