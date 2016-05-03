require.config({
	baseUrl : 'public/widget',
	paths : {
		jquery : 'ui/jquery/jquery',
		underscore : 'ui/underscore/underscore',
		backbone : 'ui/backbone/backbone',
		template : 'ui/art-template/tpl'
	},
	shim : {
		'underscore' : {
			exports : '_'
		},
		'jquery' : {
			exports : '$'
		},
		'template' : {
			exports : 'T'
		},
		'backbone' : {
			deps : ['jquery','underscore'],
			exports : 'Backbone' 
		}
	}
});

require(['backbone','ui/router/router'],function(Backbone){
	Backbone.history.start();
})