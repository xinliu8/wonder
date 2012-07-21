var app = require('express').createServer();
var express = require('express');

app.use(express.bodyParser());
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.send('hello world');
});

app.post('/question', function(req, res) {
    console.log(req.body.question);
    res.redirect('back');
});

app.listen(3000);
