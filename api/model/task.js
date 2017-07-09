var SchemaObject = require('schema-object')

/**
 * Schema for a user object
 */
var Task = new SchemaObject({
    task_id: String,
    user_id: String,
    description: String,
    due_date: Date,
    time: String
})

module.exports = Task
