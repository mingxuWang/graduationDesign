define(['backbone', 'template', 'account/login/tpls'], function(Backbone, T, tpls) {

    var $canvas = $(document.body).find('#canvas');

    var Model = Backbone.Model.extend({
    	defaults: function(){
    		return {
    			username: null,
    			password: null
    		}
    	},
    	checkLogin: function(username,password){
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
    			        var userInfo = response.content;
    			        conf.userData = userInfo;
    			        alert('success!')    //小米Note, 不知道为什么,很多情况下,从登录跳转过去,就是不能验证成功;但仅限于首页..为啥呢?
    			    } else {
    			        Alert.show(response.msg);
    			    }
    			},
    			error: function () {
    			    alert("登录失败!");
    			}
    		});
    	}
    });

    var View = Backbone.View.extend({
        tagName: 'div',
        className: 'login',
        model: null,
        events: {
        	'click .act-back': 'actBack',
        	'click .btn-login': 'actCheckLogin'
        },
        initialize: function() {
            var that = this;
            that.model = new Model();
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
        	that.model.checkLogin(username,password);
        }

    });

    return View;
})
