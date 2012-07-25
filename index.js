//setup Dependencies
var config = require('./config.js');
var express = require('express');
var answerController = require('./controllers/answer.js');
var questionController = require('./controllers/question.js');

// Setup server
var app = express.createServer();

app.configure(function() {
	app.use(express.bodyParser());
	app.use(express.static(__dirname + '/public'));
	app.use(app.router);
});

///////////////////////////////////////////
//              Routes                   //
///////////////////////////////////////////

app.get('/', function(req, res) {
	res.render('index.html')
});

app.post('/api/question', questionController.postQuestion);
app.post('/api/answers', answerController.postAnswer);

app.listen(config.port);
console.log('Listening on http://0.0.0.0:' + config.port);
