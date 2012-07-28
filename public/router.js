define([
  'jquery',
  'underscore', 
  'backbone', 
  'models/question',
  'views/questions',
  'views/answers'
  ], function($, _, Backbone, Question, QuestionsView, AnswersView){
  var AppRouter = Backbone.Router.extend({

    routes:{
      "":"home",
      "question/:id":"questionDetails"
    },
    
    home:function () {
      // Since the home view never changes, we instantiate it and render it only once
      if (!this.questionsView) {
        this.questionsView = new QuestionsView();
        this.questionsView.render();
      }
      $('#content').html(this.questionsView.el);
    },

    questionDetails:function (id) {
      var question = new Question({id:id});
      question.fetch({
        success:function (data) {
          // Note that we could also 'recycle' the same instance of EmployeeFullView
          // instead of creating new instances
          $('#content').html(new AnswersView({model:data}).render().el);
        }
      });
    }
  }); 
  return AppRouter;
});