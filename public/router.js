define([
  'jquery',
  'underscore', 
  'backbone', 
  'models/question',
  'views/question'
  ], function($, _, Backbone, Question, QuestionView){
  var AppRouter = Backbone.Router.extend({

    routes:{
      "":"home",
      "question/:id":"questionDetails"
    },
    
    questionDetails:function (id) {
      var question = new Question({id:id});
      question.fetch({
        success:function (data) {
          // Note that we could also 'recycle' the same instance of EmployeeFullView
          // instead of creating new instances
          $('#details').html(new QuestionView({model:data}).render().el);
        }
      });
    }
  }); 
  return AppRouter;
});