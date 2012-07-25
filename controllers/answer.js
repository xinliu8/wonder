//var storage = require('./mongo_store.js');
var storage = require('./solr_store.js');

var answer = exports;

answer.postAnswer = function(req, res) {
	var ans;
  ans = {
    content: req.body.content,
    name: req.body.name
  };
  storage.save(ans, 'answer', function(err) {
    if (!err) {
      return console.log("created");
    }
  });
  return res.send(ans);
};