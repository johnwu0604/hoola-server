var SchemaObject = require('schema-object')

/**
 * Schema for a shopping item object
 */
var ShoppingItem = new SchemaObject({
  item_id: String,
  user_id: String,
  description: String
})

module.exports = ShoppingItem
