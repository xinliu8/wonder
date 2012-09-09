//var storage = require('./mongo_store.js');
var storage = require('./solr_store.js');

var answer = exports;

answer.postAnswer = function(req, res) {
	var ans;
  ans = {
    answer: req.body.answer,
    a_author: req.body.a_author
  };
  
  var qId =  req.body.qId;
  var q = {};
  storage.get(qId, 'question', function(err, data) {
    if (err) {
      return console.log("get question error:" + err + "for " + qId);
    }else {
      q = data;
      if(!q.answers) {
        q.answers = new Array();
      }
      if(!q.a_authors) {
        q.a_authors = new Array();
      }
      
      q.answers.push(ans.answer);
      q.a_authors.push(ans.a_author);
      
      storage.save(q, 'question', function(err, data) {
        if (err) {
          return console.log("post question error:" + err + "for " + req.body.title);
        }else {
          return res.send(ans);
        }
      });
    }
  });
};