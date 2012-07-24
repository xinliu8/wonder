define(['underscore', 'backbone'], function(_, Backbone) {
  var AnswerModel = Backbone.Model.extend({
    // Default attributes. I used this to "define" the model
    defaults: {
      name: "John doe",
      content: "empty answer"
    },

    // Ensure that each todo created has `content`.
    initialize: function() {
      if (!this.get("content")) {
        this.set({"content": this.defaults.content});
      }
      if (!this.get("name")) {
        this.set({"name": this.defaults.name});
      }
    }
  });
  return AnswerModel;
});