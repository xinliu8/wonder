var mongoose = require('mongoose');
var config = require('../config.js');

// Connect to data
mongoose.connect(config.mongodb);

var answer = exports;

var AnswerRow = mongoose.model('Answer', new mongoose.Schema({
  content: String,
  name: String
}));

answer.postAnswer = function(req, res) {
	var ans;
  ans = new AnswerRow({
    content: req.body.content,
    name: req.body.name
  });
  ans.save(function(err) {
    if (!err) {
      return console.log("created");
    }
  });
  return res.send(ans);
};