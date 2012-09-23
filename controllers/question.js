//var storage = require('./mongo_store.js');
var storage = require('./solr_store.js');

var question = exports;

question.postQuestion = function(req, res) {
  
  var title = req.body.title;
  
  var q = {
    id: title.replace(/ /g, "-"),
    title: title,
    q_author: req.body.q_author,
    group: req.body.group
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
  var id = req.params.id;
  
  storage.get(id, 'question', function(err, data) {
    if (err) {
      return console.log("get question error:" + err + "for " + id);
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