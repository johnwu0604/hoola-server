var authenticationController = require('../api/controller/authenticationController');

module.exports = function(app) {

    app.get('/login', function(req, res) {
        var email = req.query.email;
        var password = req.query.password;
        console.log("Data is....");
        console.log(req);
        console.log("Email", email);
        console.log("Password:", password);
        authenticationController.authenticateLogin(email, password, function(data) {
            res.send(data);
        });
    });

};