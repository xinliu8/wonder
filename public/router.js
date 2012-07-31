define([
  'jquery',
  'underscore', 
  'backbone', 
  'models/question',
  'views/question_list',
  'views/question'
  ], function($, _, Backbone, Question, QuestionListView, QuestionView){
  var AppRouter = Backbone.Router.extend({

    routes:{
      "":"questionList",
      "question/:id":"questionDetails"
    },
    
    questionList:function () {
      
      if (!this.questionListView) {
        this.questionListView = new QuestionListView();
        this.questionListView.render();
      }
      $('#content').html(this.questionListView.el);
    },

    questionDetails:function (id) {
      var question = new Question({id:id});
      question.fetch({
        success:function (data) {
          // Note that we could also 'recycle' the same instance of EmployeeFullView
          // instead of creating new instances
          $('#content').html(new QuestionView({model:data}).render().el);
        }
      });
    }
  }); 
  return AppRouter;
});