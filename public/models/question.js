define([
  'underscore', 
  'backbone', 
  'collections/answers'
  ], function(_, Backbone, Answers){  
  var QuestionModel = Backbone.Model.extend({
  
    initialize: function() {
      this.answers = new Answers;
    },
    
    //url: '/api/question',
    urlRoot: '/api/question'
  });
  return QuestionModel;
});