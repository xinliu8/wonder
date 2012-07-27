define([
  'jquery', 
  'underscore', 
  'backbone',
  'text!templates/questions.html'
  ], function($, _, Backbone, QuestionsTemplate){
  var QuestionsView = Backbone.View.extend({

    template: _.template(QuestionsTemplate),
    
    initialize: function() {
    },

    render: function() {
      $(this.el).html(this.template());
      return this;
    }
  });
  return QuestionsView;
});