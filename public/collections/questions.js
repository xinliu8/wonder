define([
  'underscore', 
  'backbone', 
  'models/question'
  ], function(_, Backbone, Question){

	var QuestionCollection = Backbone.Collection.extend({

    model: Question,
    url: '/api/question'
    
  });
  return QuestionCollection;
});