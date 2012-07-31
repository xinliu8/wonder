define([
  'jquery', 
  'underscore', 
  'backbone',
  'text!templates/question_item.html'
  ], function($, _, Backbone, QuestionItemTemplate){
  var QuestionItemView = Backbone.View.extend({

    tagName:  "li",

    template: _.template(QuestionItemTemplate),
    
    initialize: function() {
      this.model.bind('change', this.render, this);
      this.model.view = this;
    },

    render: function() {
      $(this.el).html(this.template(this.model.toJSON()));
      return this;
    }
  });
  return QuestionItemView;
});