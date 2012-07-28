define([
  'jquery', 
  'underscore', 
  'backbone',
  'models/answer',
  'views/answer',
  'collections/answers',
  'text!templates/answers.html'
  ], function($, _, Backbone, Answer, AnswerView, Answers, AnswersTemplate){
  var AnswersView = Backbone.View.extend({
  
    template : _.template(AnswersTemplate),
    
    events: {
      "keypress #new-answer": "createOnEnter"
		},
    
    initialize: function() {
      this.answers = this.model.answers || new Answers;
      this.answers.bind('add', this.addOne, this);
    },

    render: function() {
      //this.$("#title").html(this.model.get('content'));
      //_.each(this.answers, function(answer) {
      //  var view = new AnswerView({model: answer});
      //  this.$("#answer-list").append(view.render().el);
      //});
      
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
        content: this.$("#new-answer").val(),
        name:    "Xin"
      });
      
      this.answers.add(q);
      this.$("#new-answer").val('');
    }
  });
  return AnswersView;
});