var SchemaObject = require('schema-object')

/**
 * Schema for a finance object
 */
var Finance = new SchemaObject({
  item_id: String,
  user_id: String,
  type_id: String,
  category_id: String,
  date: Date,
  description: String,
  amount: String
})

module.exports = Finance
