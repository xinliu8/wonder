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
      if(!q.answer) {
        q.answer = new Array();
      }
      if(!q.a_author) {
        q.a_author = new Array();
      }
      
      q.answer.push(ans.answer);
      q.a_author.push(ans.a_author);
      
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