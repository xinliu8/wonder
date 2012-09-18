// Filename: main.js

// Require.js allows us to configure mappings to paths
// as demonstrated below:
require.config({
  paths: {
    jquery: 'libs/jquery/jquery-1.7.2.min',
    jqueryui: 'libs/jquery/jquery-ui-1.8.23.custom.min',
    underscore: 'libs/underscore/underscore',
    backbone: 'libs/backbone/backbone',
    text: 'libs/require/text',
    bootstrap: 'libs/bootstrap/bootstrap.min'
  },
  shim: {
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: ["underscore", "jquery"],
      exports: "Backbone"
    },
    bootstrap: {
      deps: ["jquery"]
    }
  }
});

// put bootstrap here to load it from the beginning
require([
  'router',
  'bootstrap'
  ], function(Router, BootStrap){
  
  window.router = new Router();
  Backbone.history.start();
});