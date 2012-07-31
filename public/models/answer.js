define(['underscore', 'backbone'], function(_, Backbone) {
  var AnswerModel = Backbone.Model.extend({
    
    initialize: function() {
    },
    
    urlRoot: '/api/answer'
  });
  return AnswerModel;
});