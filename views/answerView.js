window.AnswerView = Backbone.View.extend({

	initialize:function () {
		this.template = _.template(tpl.get('answer'));
		this.model.bind("change", this.render, this);
	},

	render:function (eventName) {
		$(this.el).html(this.template(this.model.toJSON()));
		return this;
	}

});