define([
  'jquery', 
  'underscore', 
  'backbone',
  'models/answer',
  'views/answer',
  'collections/answers',
  'text!templates/question.html'
  ], function($, _, Backbone, Answer, AnswerView, Answers, QuestionTemplate){
  var QuestionView = Backbone.View.extend({
  
    template : _.template(QuestionTemplate),
    
    events: {
      "keypress #new-answer": "createOnEnter"
		},
    
    initialize: function() {
      if(!this.model.get('answers')) {
        this.model.set('answers', new Answers);
      }
      this.answers = this.model.get('answers');
      this.answers.bind('add', this.addOne, this);
    },

    render: function() {
      $(this.el).html(this.template(this.model.toJSON()));
      return this;
    },
    
    addOne: function(answer) {
      // this save will update the id returned by the server
      answer.save(undefined, 
        {
          success: function(model, res) {
            var view = new AnswerView({model: model});
            this.$("#answer-list").append(view.render().el);
          }
        });
    },

    // If you hit return in the main input field, create new **Answer** model
    createOnEnter: function(e) {
      if (e.keyCode != 13) return;
      var q = new Answer({
        qId: this.model.get('id'),
        answer: this.$("#new-answer").val(),
        a_author:    "Xin"
      });
      
      this.answers.add(q);
      this.$("#new-answer").val('');
    }
  });
  return QuestionView;
});