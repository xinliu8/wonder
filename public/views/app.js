define([
  'jquery',
  'underscore', 
  'backbone',
  'models/question',
  'collections/questions',
  'views/question'
  ], function($, _, Backbone, Question, Questions, QuestionView){
  var AppView = Backbone.View.extend({

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
      // this save will update the id returned by the server
      question.save();
      var view = new QuestionView({model: question});
      this.$("#question-list").append(view.render().el);
    },

    // If you hit return in the main input field, create new **Answer** model
    createOnEnter: function(e) {
      if (e.keyCode != 13) return;
      var q = new Question({
        content: this.input.val(),
        name:    "Xin"
      });
      
      this.questions.add(q);
      this.input.val('');
    }
  });
  return AppView;
});