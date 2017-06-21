var SchemaObject = require('schema-object');

/**
 * Schema for a user object
 */
var User = new SchemaObject({
    id: Number,
    first_name: String,
    last_name: String,
    email: String,
    password: String
});

module.exports = User;
