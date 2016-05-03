define(['backbone','jquery','template'],function(Backbone,$,T){
	var router = Backbone.Router.extend({
		routes : {
			'' : 'pageHome'
		},
		pageHome : function(){
			$(document.body).append('<div>Home</div>');
		}
	})
	var App = new router();
	return App
})