define(['backbone', 'template', 'account/login/tpls'], function(Backbone, T, tpls) {

    var $canvas = $(document.body).find('#canvas');

    var View = Backbone.View.extend({
        tagName: 'div',
        className: 'login',
        model: null,
        events: {
        	'click .act-back': 'actBack',
        	'click .btn-login': 'actCheckLogin'
        },
        initialize: function(options) {
            var that = this;
            var querys = options.querys;
            that.redirectUrl = querys.redirectUrl;
            that.router = that.getRouter(that.redirectUrl);
            that.render();
        },
        render: function() {
        	var that = this;
            that.renderSkeleton();
            that.renderHeader();
            that.renderLogin();
        },
        renderSkeleton: function() {
            this.$el.html(T.compile(tpls.skeleton));
            $canvas.append(this.$el);
        },
        renderHeader: function() {
            var that = this;
            that.$el.find('.main .header').html(T.compile(tpls.header)({ title: '登录' }));
        },
        renderLogin: function() {
        	var that = this;
        	that.$el.find('.main .login').html(T.compile(tpls.login));
        },
        actBack: function(){
        	Backbone.history.navigate('/index',{trigger:true,replace:false});
        },
        actCheckLogin: function(){
        	var that = this;
        	var username = $('#username').val();
        	var password = $('#password').val();
        	that.checkLogin(username,password);
        },
    	checkLogin: function(username,password){
    		var that = this;
    		var username = username;
    		var password = password;
    		$.ajax({
    			url: '/account/login',
    			dataType: "json",
    			data: {
    				"username":username,
    				"password": password
    			},
    			type: "POST",
    			success: function (response) {
    			    if (response.ret === 0) {
    			        conf.is_login = true;
    			        Backbone.history.navigate(that.router,{trigger:true,replace:false});
    			    } else {
    			        Alert.show(response.msg);
    			    }
    			},
    			error: function () {
    			    alert("登录失败!");
    			}
    		});
    	},
    	getRouter: function(string){
    		var begin = string.indexOf('#');
    		return string.slice(begin);
    	}

    });

    return View;
})
