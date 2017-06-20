var express = require('express');
var router = express.Router();

var db = require('../queries/queries.js');

/* Test Hello World Endpoint*/
router.get('/', function(req, res, next) {
    res.send({
        'title': 'Hello World'
    });
});

/* Test Postgres Endpoint */
router.get('/db', db.getTest );

module.exports = router;
