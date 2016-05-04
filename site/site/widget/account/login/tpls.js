define(function(){
	var tpls = {
		skeleton: [
		    '<div class="main">',
		        '<header class="header">',
		        '</header>',
		        '<div class="login">',
		        '</div>',
		    '</div>'
		].join(''),
		header: [
		    '<span class="act-back">⬅︎</span>',
		    '<h1>{{title}}</h1>'
		].join(''),
		login : [
			'<div class="user-info">',
				'<div>',
					'<label for="username">用户名：</label>',
					'<input id="username" name="username" type="text" />',
				'</div>',
				'<div>',
					'<label for="password">密&nbsp&nbsp&nbsp码：</label>',
					'<input id="password" name="password" type="password" />',
				'</div>',
			'</div>',
			'<div class="button">',
				'<span class="btn btn-register">注册</span>',
				'<span class="btn btn-login">登录</span>',
			'</div>'
		].join('')
	}
	return tpls
})