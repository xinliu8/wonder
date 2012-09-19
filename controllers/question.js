//var storage = require('./mongo_store.js');
var storage = require('./solr_store.js');

var question = exports;

question.postQuestion = function(req, res) {
  
  var q = {
    title: req.body.title.replace(/ /g, "_"),
    q_author: req.body.q_author
  };
  
  if(req.body.answers){
    q.answers = req.body.answers;
  }
  
  storage.save(q, 'question', function(err, data) {
    if (err) {
      return console.log("post question error:" + err + "for " + req.body.title);
    }else {
      return res.send(q);
    }
  });
};

question.getQuestion = function(req, res) {
  var title = req.params.title;
  
  storage.get(title, 'question', function(err, data) {
    if (err) {
      return console.log("get question error:" + err + "for " + title);
    }else {
      return res.send(data);
    }
  });
};

question.getSuggest = function(req, res) {
  var hint = req.params.hint;
  
  storage.suggest(hint, 'question', function(err, data) {
    if (err) {
      return console.log("post hint error:" + err + "for " + hint);
    }else {
      return res.send(data);
    }
  });
};