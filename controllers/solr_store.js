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
  var url = "http://{0}:{1}/solr/update/json?commit=true".format(config.solr.server, config.solr.port);
  obj['id'] = "Test123";
  var doc = {};
  //doc['doc'] = {'id':'Test23'};
  doc['doc'] = obj;
  
  var toSave = {};
  toSave['add'] = doc;
  
  var data = JSON.stringify(toSave);
  console.log(data);
  
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