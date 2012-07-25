define([
  'jquery',
  'underscore', 
  'backbone',
  'models/question',
  'collections/questions',
  'views/question'
  ], function($, _, Backbone, Question, Questions, QuestionView){
  var FrontView = Backbone.View.extend({

    // Instead of generating a new element, bind to the existing skeleton of
    // the App already present in the HTML.
    el: $("#QAapp"),

    // Delegated events for creating new items, and clearing completed ones.
    events: {
      "keypress #new-question": "createOnEnter"
		},

    // At initialization we bind to the relevant events on the `Todos`
    // collection, when items are added or changed. Kick things off by
    // loading any preexisting todos that might be saved in *localStorage*.
    initialize: function() {
      this.input    = this.$("#new-question");
      this.questions = new Questions;
      this.questions.bind('add', this.addOne, this);
    },

    render: function() {
    },

    // Add a single todo item to the list by creating a view for it, and
    // appending its element to the `<ul>`.
    addOne: function(question) {
      var view = new QuestionView({model: question});
      this.$("#question-list").append(view.render().el);
    },

    // Generate the attributes for a new Todo item.
    newAttributes: function() {
      return {
        content: this.input.val(),
        name:    "Xin"
      };
    },

    // If you hit return in the main input field, create new **Answer** model
    createOnEnter: function(e) {
      if (e.keyCode != 13) return;
      var q = new Question({
        content: this.input.val(),
        name:    "Xin"
      });
      q.save();
      this.questions.add(q);
      //this.questions.create(this.newAttributes());
      this.input.val('');
    }
  });
  return FrontView;
});