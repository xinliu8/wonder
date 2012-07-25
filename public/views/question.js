define([
  'jquery', 
  'underscore', 
  'backbone',
  'text!templates/question.html'
  ], function($, _, Backbone, QuestionTemplate){
  var QuestionView = Backbone.View.extend({

    tagName:  "li",

    template: _.template(QuestionTemplate),
    
    events: {
      "click #q":     "navigate",
    },

    initialize: function() {
      this.model.bind('change', this.render, this);
      this.model.view = this;
    },

    render: function() {
      $(this.el).html(this.template(this.model.toJSON()));
      return this;
    },
    
    navigate: function() {
      alert(this.model.id);
    }
  });
  return QuestionView;
});