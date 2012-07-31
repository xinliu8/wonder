//var storage = require('./mongo_store.js');
var storage = require('./solr_store.js');

var answer = exports;

answer.postAnswer = function(req, res) {
	var ans;
  ans = {
    content: req.body.content,
    name: req.body.name
  };
  
  var qId =  req.body.qId;
  var q = {};
  storage.get(qId, 'question', function(err, data) {
    if (err) {
      return console.log("get question error:" + err + "for " + qId);
    }else {
      q = data;
    }
  });
  
  if(!q.answers) {
    q.answers = new Array();
  }
  
  q.answers.push(ans);
  
  storage.save(q, 'question', function(err, data) {
    if (err) {
      return console.log("post question error:" + err + "for " + req.body.title);
    }else {
      return res.send(ans);
    }
  });
};