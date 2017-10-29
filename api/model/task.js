var SchemaObject = require('schema-object')

/**
 * Schema for a task object
 */
var Task = new SchemaObject({
  task_id: String,
  user_id: String,
  description: String,
  due_date: Date
})

module.exports = Task
