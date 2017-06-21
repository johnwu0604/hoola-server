const pool = require('../lib/db');

var userService = require('../api/service/userService');

module.exports = function(app) {

    app.get('/test', function(req, res) {
        pool.query('SELECT * FROM test', [], function(err, data) {
            if(err) {
                console.error('error running query', err);
                res.sendStatus(404);
            }
            res.send(data);
        });
    });

};