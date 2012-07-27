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

storage.save = function(obj, tableName, error) {
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
    if (!err && response.statusCode == 200) {
      console.log("success");
      console.log(body);
    }
    else {
      console.log("error");
      error(err);
    }
  });
};

storage.get = function(id, tableName, callback) {
  var url = "http://{0}:{1}/solr/select/?q=id:{2}&wt=json&indent=on".format(config.solr.server, config.solr.port, id);  
  request(url, function (err, response, body) {
    callback(body, err);
  });
};
  