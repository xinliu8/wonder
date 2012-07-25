var mongoose = require('mongoose');
var config = require('../config.js');

mongoose.connect(config.mongodb);

var storage = exports;

var AnswerModel = mongoose.model('answer', new mongoose.Schema({
  content: String,
  name: String
}));

storage.tables = {};
storage['answer'] = AnswerModel;

storage.save = function(obj, tableName, error) {
	var ans;
  ans = new storage[tableName](obj);
  ans.save(error);
};