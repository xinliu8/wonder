var request = require('request');
var config = require('../config.js');

var storage = exports;

String.prototype.format = function() {
  var args = arguments;
  return this.replace(/{(\d+)}/g, function(match, number) { 
    return typeof args[number] != 'undefined'
      ? args[number]
      : match
    ;
  });
};

storage.save = function(obj, tableName, callback) {
  var toSave = {};
  toSave['add'] = {};
  toSave['add']['doc'] = obj;
  
  var data = JSON.stringify(toSave);
  var url = "http://{0}:{1}/solr/update/json?commit=true".format(config.solr.server, config.solr.port);  
  
  request( 
    { method: 'POST'
    , uri: url
    , headers : {'Content-Type': 'application/json', 'Content-Length': data.length}
    , body: data
    }
  , function (err, response, body) {
    callback(err, body);
  });
};

storage.get = function(id, tableName, callback) {
  var url = "http://{0}:{1}/solr/select/?q=id:{2}&wt=json&indent=on".format(config.solr.server, config.solr.port, id);  
  request(url, function (err, response, body) {
    if(err){
      callback(err, undefined);
    } else {
      var obj = JSON.parse(body);
      if(obj && obj.response && obj.response.docs && obj.response.docs.length > 0)
      {
        callback(err, obj.response.docs[0]);
      } else {
        callback(err, {"id": id});
      }
    }
  });
};

storage.suggest = function(hint, tableName, callback) {
  var url = "http://{0}:{1}/solr/suggest?q={2}&wt=json&indent=on".format(config.solr.server, config.solr.port, hint);  
  request(url, function (err, response, body) {
    if(err){
      callback(err, undefined);
    } else {
      var obj = JSON.parse(body);
      // obj.spellcheck.suggestions[0] == hint
      if(obj && obj.spellcheck && obj.spellcheck.suggestions && obj.spellcheck.suggestions.length > 1)
      {
        callback(err, obj.spellcheck.suggestions[1].suggestion);
      } else {
        callback(err, []);
      }
    }
  });
};
  