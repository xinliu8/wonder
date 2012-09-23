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
      this.model.answers.bind('add', this.saveAnswer, this);
      if(!this.model.has('answers')) {
        this.model.set('answers', new Array);
      }
    },
    
    populate: function() {
      // populate answers content from store to this.model.answers collection
      var answers = this.model.get('answers');
      if(answers) {
        for(var i=0; i< answers.length; i++) {
          var ans = new Answer({
            qId: this.model.get('id'),
            answer: answers[i],
            a_author:    "Xin"
          });
          
          this.appendAnswer(ans);
        }
      }
    },
    
    render: function() {
      $(this.el).html(this.template(this.model.toJSON()));
      return this;
    },
    
    appendAnswer: function(answer) {
      // this save will update the id returned by the server
      var view = new AnswerView({model: answer});
      this.$("#answer-list").append(view.render().el);
    },
    
    saveAnswer: function(answer) {
      // this save will update the id returned by the server
      var that = this;
      answer.save(undefined, 
        {
          success: function(model, res) {
            that.appendAnswer(model);
          }
        });
    },

    // If you hit return in the main input field, create new **Answer** model
    createOnEnter: function(e) {
      if (e.keyCode != 13) return;
      var ans = new Answer({
        qId: this.model.get('title'),
        answer: this.$("#new-answer").val(),
        a_author:    "Xin"
      });
      
      this.model.answers.add(ans);
      this.$("#new-answer").val('');
    }
  });
  return QuestionView;
});