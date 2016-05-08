define(['backbone','ui/helper/helper'],function(Backbone,mainNav,helper){
	var App = Backbone.Router.extend({
		routes: {
			'index': 'pageIndex',
			'login': 'pageLogin',
			'count': 'pageCount',
			'artical': 'pageArtical',
			'push': 'pagePush',
			'*action' : 'pageLogin',
		},
		currentView: null,
		mainNav: null,
		initialize: function () {
			
		},
		clean: function () {
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
			require(['background/index/index'],function(view){
				that.clean();
				that.currentView = new view();
			});
		},
		pageCount: function(queryString){
			var that =this;
			// var querys = that.getQuerys(queryString);
			require(['background/count/count'],function(view){
				that.clean();
				that.currentView = new view();
			});
		},
		pageArtical: function(queryString){
			var that =this;
			// var querys = that.getQuerys(queryString);
			require(['background/artical/artical'],function(view){
				that.clean();
				that.currentView = new view();
			});
		},
		pagePush: function(queryString){
			var that =this;
			// var querys = that.getQuerys(queryString);
			require(['background/push/push'],function(view){
				that.clean();
				that.currentView = new view();
			});
		}


	});
	var app = new App();
	return app;
});
