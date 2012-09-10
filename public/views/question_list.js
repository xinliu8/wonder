define([
  'jquery',
  'jqueryui',
  'underscore', 
  'backbone',
  'models/question',
  'views/question_item',
  'collections/questions',
  'text!templates/question_list.html'
  ], function($, JqueryUi, _, Backbone, Question, QuestionItemView, Questions, QuestionListTemplate){
  var QuestionListView = Backbone.View.extend({

    template: _.template(QuestionListTemplate),
    
    events: {
      "keypress #newQuestion": "createOnEnter"
		},
    
    initialize: function() {
      this.questions = new Questions;
      this.questions.bind('add', this.addOne, this);
      $("#newQuestion").autocomplete({
        minLength: 2,
        source: "",
      });
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
            var view = new QuestionItemView({model: model});
            this.$("#question-list").append(view.render().el);
          }
        });
    },

    // If you hit return in the main input field, create new **Answer** model
    createOnEnter: function(e) {
      if (e.keyCode != 13) return;
      var q = new Question({
        title: this.$("#new-question").val(),
        q_author:    "Xin"
      });
      
      this.questions.add(q);
      this.$("#new-question").val('');
    }
  });
  return QuestionListView;
});