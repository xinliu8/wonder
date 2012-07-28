//var storage = require('./mongo_store.js');
var storage = require('./solr_store.js');

var answer = exports;

answer.postAnswer = function(req, res) {
	var ans;
  ans = {
    content: req.body.content,
    name: req.body.name
  };
  
  storage.save(ans, 'answer', function(err, data) {
    if (err) {
      return console.log("post answer error:" + err + "for " + req.body.content);
    }else {
      return res.send(ans);
    }
  });
};