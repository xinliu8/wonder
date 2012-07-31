define([
  'jquery', 
  'underscore', 
  'backbone',
  'text!templates/answer.html'
  ], function($, _, Backbone, AnswerItemTemplate){
  var AnswerView = Backbone.View.extend({

    //... is a list tag.
    tagName:  "li",

    // Cache the template function for a single item.
    template: _.template(AnswerItemTemplate),

    // a one-to-one correspondence between a **Answer** and a **AnswerView**
    initialize: function() {
      this.model.bind('change', this.render, this);
      this.model.view = this;
    },

    render: function() {
      $(this.el).html(this.template(this.model.toJSON()));
      return this;
    }
  });
  return AnswerView;
});