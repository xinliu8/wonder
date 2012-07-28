define([
  'jquery', 
  'underscore', 
  'backbone',
  'models/question',
  'views/question',
  'collections/questions',
  'text!templates/questions.html'
  ], function($, _, Backbone, Question, QuestionView, Questions, QuestionsTemplate){
  var QuestionsView = Backbone.View.extend({

    template: _.template(QuestionsTemplate),
    
    events: {
      "keypress #new-question": "createOnEnter"
		},
    
    initialize: function() {
      this.questions = new Questions;
      this.questions.bind('add', this.addOne, this);
    },

    render: function() {
      $(this.el).html(this.template());
      return this;
    },
    
    addOne: function(question) {
      // this save will update the id returned by the server
      question.save(undefined, 
        {
          success: function(model, res) {
            var view = new QuestionView({model: model});
            this.$("#question-list").append(view.render().el);
          }
        });
    },

    // If you hit return in the main input field, create new **Answer** model
    createOnEnter: function(e) {
      if (e.keyCode != 13) return;
      var q = new Question({
        content: this.$("#new-question").val(),
        name:    "Xin"
      });
      
      this.questions.add(q);
      this.$("#new-question").val('');
    }
  });
  return QuestionsView;
});