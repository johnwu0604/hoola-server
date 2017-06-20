var promise = require('bluebird');
var env = require('dotenv').config();

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://'+ process.env.DB_USER + ':' + process.env.DB_PASS + '@' + process.env.DB_HOST;
var client = pgp(connectionString);

function getTest(req, res, next) {
  client.any('SELECT * FROM test')
    .then(function (data) {
      res.send(data);
    })
    .catch(function (err) {
      return next(err);
    });
}

// add query functions
module.exports = {
  getTest: getTest
};
