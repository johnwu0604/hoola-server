// app
var express = require('express');
var app = express();
var port     = process.env.PORT || 5000;

// parser
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

// route files
var test = require('./routes/test');

// setup
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());

// routes
app.use('/test', test);

// start server
app.listen(port);
console.log("App listing on port " + port);