define([
  'underscore', 
  'backbone', 
  'models/answer'
  ], function(_, Backbone, Answer){

	var AnswerCollection = Backbone.Collection.extend({

    // Reference to this collection's model.
    model: Answer

  });
  return new AnswerCollection;
});