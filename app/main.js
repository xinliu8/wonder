var appMain = function(){
			
  var pub = {};
  
  pub.Answer = Backbone.Model.extend({
  
  });

  pub.AnswerList = Backbone.Collection.extend({
  
    model: pub.Answer,
    
  });

  pub.answers = new pub.AnswerList;
  
  pub.AnswerView = Backbone.View.extend({
  
    initialize: function() {
	  this.template = _.template(tpl.get('answer'));
      this.model.bind('change', this.render);
    },
  
    render: function() {
      $(this.el).set('html', this.template(this.model.toJSON()));
      return this;
    }
  });

  pub.AppView = Backbone.View.extend({
  
    events: {
      "keypress #new-answer" : "createOnEnter"
    },
    
    initialize: function() {
      this.input = this.$("#new-answer");
      pub.answers.bind('add',     this.addOne);
    },
	
	render: function() {
	},
    
    addOne: function(answer) {
      var view = new pub.AnswerView({model: answer}).render().el;
      this.$("#answer-list").grab(view);
    },
    
    createOnEnter: function(e) {
      if (e.code != 13) return;
      pub.answers.create({
		name: "xin",
        content: this.input.getProperty("value")
      });
    }
  });

  console.log('return appMain');
  
  return pub;
};

