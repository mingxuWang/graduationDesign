define(['backbone','ui/helper/helper'],function(Backbone,mainNav,helper){
	var App = Backbone.Router.extend({
		routes: {
			//'' : 'actIndex',
			'index': 'pageIndex',
			'login': 'pageLogin',
			'*action' : 'pageLogin',
		},
		currentView: null,
		mainNav: null,
		initialize: function () {
			
		},
		clean: function () {
			// console.log(this.currentView);
			if (this.currentView) {
				if(this.currentView.close) {
					this.currentView.close();
				}
				this.currentView.remove();
				this.currentView = null;
			}
			
		},
		getQuerys: function(queryString){
			var querys = {};
			if(queryString){
				querys = helper.queryLocationSearch('?'+queryString);
			}
			return querys;
		},
		pageLogin: function(queryString){
			var that =this;
			// var querys = that.getQuerys(queryString);
			require(['background/login/login'],function(view){
				that.clean();
				that.currentView = new view();
			});
		},
		pageIndex: function(queryString){
			var that =this;
			// var querys = that.getQuerys(queryString);
			require(['index/list/list'],function(view){
				that.clean();
				that.currentView = new view();
			});
		}


	});
	var app = new App();
	return app;
});
