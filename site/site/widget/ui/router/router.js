define(['backbone','ui/nav/nav'],function(Backbone,mainNav){
	var App = Backbone.Router.extend({
		routes: {
			//'' : 'actIndex',
			'index': 'actIndex',
			'index/info': 'actInfo',
			'search': 'actSearch',
			'baoliao-detail?baoliao_id=:id': 'actBaoliaoDetail',
			'my-buy': 'actMyBuy',
			'my':'actMy',
			'collection':'actCollection',
			'comment':'actComment',
			'all-comment?baoliao_id=:id':'actAllcomment',
			'comeout':'actComeout',
			'*action' : 'actIndex',
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
				nav: 'baoliao'
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
		actIndex: function(){
			var that =this;
			require(['index/list/list'],function(view){
				that.clean({
					hideMenu: false,
					nav: 'index'
				});
				that.currentView = new view();
			});
		},
		actInfo: function(){
			var that = this;
			require(['index/info/info'],function(view){
				that.clean({
					hideMenu: false,
					nav: 'index'
				});
				that.currentView = new view();
			})
		},
		actSearch: function(){
			var that =this;
			require(['search/search'],function(view){
				that.clean({
					hideMenu: false,
					nav: 'search'
				});
				that.currentView = new view();
			});
		},
		actBaoliaoDetail: function (id) {
			var that = this;
			require(['baoliao-detail/baoliao-detail'],function(view){
				that.clean({
					hideMenu: true,
					nav: ''
				});
				that.currentView = new view({id:id});
			});
		},
		actMy: function () {
			var that = this;
			require(['my/my'],function(view){
				that.clean({
					hideMenu: false,
					nav: 'my'
				});
				that.currentView = new view();
			});
		},
		actCollection: function () {
			var that = this;
			require(['collection/collection'],function(view){
				that.clean({
					hideMenu: true,
				});
				that.currentView = new view();
			});
		},
		actComment: function () {
			var that = this;
			require(['comment/comment'],function(view){
				that.clean({
					hideMenu: true,
				});
				that.currentView = new view();
			});
		},
		actAllcomment: function (id) {
			var that = this;
			require(['act-comment/act-comment'],function(view){
				that.clean({
					hideMenu: true,
				});
				that.currentView = new view({id:id});
			});
		},
		actComeout: function () {
			var that = this;
			require(['comeout/comeout'],function(view){
				that.clean({
					hideMenu: true,
				});
				that.currentView = new view();
			});
		},


	});
	var app = new App();
	return app;
});
