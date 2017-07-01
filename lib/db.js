var pg = require('pg')
require('dotenv').config()

var config = {
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  max: 10,
  idleTimeoutMillis: 30000
}

var pool = new pg.Pool(config)

pool.on('error', function (err, client) {
    // if an error is encountered by a client while it sits idle in the pool
    // the pool itself will emit an error event with both the error and
    // the client which emitted the original error
    // this is a rare occurrence but can happen if there is a network partition
    // between your application and the database, the database restarts, etc.
    // and so you might want to handle it and at least log it out
  console.error('idle client error', err.message, err.stack)
})

// export the query method for passing queries to the pool
module.exports.query = function (text, values, callback) {
  console.log('query:', text, values)
  return pool.query(text, values, callback)
}

// the pool also supports checking out a client for
// multiple operations, such as a transaction
module.exports.connect = function (callback) {
  return pool.connect(callback)
}
