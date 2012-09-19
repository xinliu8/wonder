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
      "question/:title":"questionDetails"
    },
    
    questionList:function () {
      this.questionListView = new QuestionListView();
      this.questionListView.render();
      $('#content').html(this.questionListView.el);
    },

    questionDetails:function (title) {
      // even though we use title as id, Backbone.sync assume "id" when doing CRUD
      var question = new Question({id:title});
      question.fetch({
        success:function (data) {
          var questionView = new QuestionView({model:data});
          $('#content').html(questionView.render().el);
          questionView.populate();
        }
      });
    }
  }); 
  return AppRouter;
});