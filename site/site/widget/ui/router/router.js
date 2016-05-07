define(['backbone','ui/nav/nav','ui/helper/helper'],function(Backbone,mainNav,helper){
	var App = Backbone.Router.extend({
		routes: {
			//'' : 'actIndex',
			'index': 'pageIndex',
			'index/info': 'pageInfo',
			'search': 'pageSearch',
			'chatting': 'pageChatting',
			'chatting/room': 'pageChattingRoom',
			'my':'pageMy',
			'my/tips': 'pageTips',
			'my/changePassword': 'pageChangePwd',
			'register': 'pageRegister',
			'login': 'pageLogin',
			'*action' : 'pageIndex',
		},
		currentView: null,
		mainNav: null,
		initialize: function () {
			this.mainNav = mainNav;
		},
		clean: function (options) {
			console.log(this.currentView);
			if (this.currentView) {
				if(this.currentView.close) {
					this.currentView.close();
				}
				this.currentView.remove();
				this.currentView = null;
			}
			var defaultOptions = {
				hideMenu: false,
				nav: 'index'
			};
			options = $.extend(defaultOptions, options);
			this.hideMenu = options.hideMenu;
			if(this.mainNav) {
				if(options.hideMenu) {
					this.mainNav.hide();
				} else {
					this.mainNav.show(options.nav);
				}
			}
		},
		getQuerys: function(queryString){
			var querys = {};
			if(queryString){
				querys = helper.queryLocationSearch('?'+queryString);
			}
			return querys;
		},
		pageIndex: function(queryString){
			var that =this;
			var querys = that.getQuerys(queryString);
			require(['index/list/list'],function(view){
				that.clean({
					hideMenu: false,
					nav: 'index'
				});
				that.currentView = new view({querys:querys});
			});
		},
		pageInfo: function(queryString){
			var that = this;
			var querys = that.getQuerys(queryString);
			require(['index/info/info'],function(view){
				that.clean({
					hideMenu: true,
					nav: 'index'
				});
				that.currentView = new view({querys:querys});
			});
		},
		pageSearch: function(queryString){
			var that =this;
			var querys = that.getQuerys(queryString);
			require(['search/search'],function(view){
				that.clean({
					hideMenu: false,
					nav: 'search'
				});
				that.currentView = new view({querys:querys});
			});
		},
		pageChatting: function(queryString){
			var that =this;
			var querys = that.getQuerys(queryString);
			require(['chatting/list/list'],function(view){
				that.clean({
					hideMenu: false,
					nav: 'chatting'
				});
				that.currentView = new view({querys:querys});
			});
		},
		pageChattingRoom: function(queryString){
			var that =this;
			var querys = that.getQuerys(queryString);
			require(['chatting/room/room'],function(view){
				that.clean({
					hideMenu: true,
					nav: 'chatting'
				});
				that.currentView = new view({querys:querys});
			});
		},
		pageMy: function (queryString) {
			var that = this;
			var querys = that.getQuerys(queryString);
				conf.is_login = helper.getItem('is_login') || conf.is_login;
			if(conf.is_login === true){
				require(['my/my'],function(view){
					that.clean({
						hideMenu: false,
						nav: 'my'
					});
					that.currentView = new view({querys:querys});
				});
			}else{
				var redirectUrl = location.href;
				that.navigate('/login?redirectUrl='+redirectUrl,{trigger:true,replace:false});
			}

		},
		pageTips: function(queryString){
			var that =this;
			var querys = that.getQuerys(queryString);
			require(['my/tips/tips'],function(view){
				that.clean({
					hideMenu: true,
					nav: 'my'
				});
				that.currentView = new view({querys:querys});
			});
		},
		pageChangePwd: function(queryString){
			var that =this;
			var querys = that.getQuerys(queryString);
			require(['my/change-pwd/change-pwd'],function(view){
				that.clean({
					hideMenu: true,
					nav: 'my'
				});
				that.currentView = new view({querys:querys});
			});
		},
		pageLogin: function(queryString){
			var that =this;
			var querys = that.getQuerys(queryString);
			require(['account/login/login'],function(view){
				that.clean({
					hideMenu: true,
					nav: 'index'
				});
				console.log(querys);
				that.currentView = new view({querys:querys});
			});
		},
		pageRegister: function(queryString){
			var that =this;
			var querys = that.getQuerys(queryString);
			require(['account/register/register'],function(view){
				that.clean({
					hideMenu: true,
					nav: 'index'
				});
				that.currentView = new view({querys:querys});
			});
		}


	});
	var app = new App();
	return app;
});
