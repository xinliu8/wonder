//var storage = require('./mongo_store.js');
var storage = require('./solr_store.js');

var question = exports;
question.count = 0;

question.postQuestion = function(req, res) {
  var loginId = 'Xin';
	
  var q = {
    id : loginId + question.count,
    title: req.body.title,
    author: req.body.author
  };
  
  if(req.body.answers){
    q.answers = req.body.answers;
  }
  
  question.count += 1;
  
  storage.save(q, 'question', function(err, data) {
    if (err) {
      return console.log("post question error:" + err + "for " + req.body.title);
    }else {
      return res.send(q);
    }
  });
};

question.getQuestion = function(req, res) {
  var qId = req.params.id;
  
  storage.get(qId, 'question', function(err, data) {
    if (err) {
      return console.log("get question error:" + err + "for " + qId);
    }else {
      return res.send(data);
    }
  });
};