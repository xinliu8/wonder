//var storage = require('./mongo_store.js');
var storage = require('./solr_store.js');

var question = exports;
question.count = 0;

question.postQuestion = function(req, res) {
  var loginId = 'Xin';
	var q = {
    id : loginId + question.count,
    content: req.body.content,
    name: req.body.name
  };
  
  question.count += 1;
  
  storage.save(q, 'question', function(err) {
    if (!err) {
      return console.log("created");
    }
  });
  return res.send(q);
};