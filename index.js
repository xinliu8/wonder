//setup Dependencies
var config = require('./public/config.js');
var express = require('express');
var mongoose = require('mongoose');

var answerController = require('./public/controllers/answer.js');

// Connect to data
mongoose.connect(config.mongodb);

// Setup server
var app = express.createServer();

app.configure(function() {
	app.use(express.bodyParser());
	app.use("/lib", express.static(__dirname + '/lib'));
	app.use("/app", express.static(__dirname + '/app'));
	app.use("/templates", express.static(__dirname + '/templates'));
	app.use(express.static(__dirname + '/public'));
	app.use(app.router);
});

///////////////////////////////////////////
//              Routes                   //
///////////////////////////////////////////

app.get('/', function(req, res) {
	res.render('index.html')
});

// API routes return JSON
app.post('/api/answer/:qId', answerController.postAnswer);

app.listen(config.port);
console.log('Listening on http://0.0.0.0:' + config.port);
