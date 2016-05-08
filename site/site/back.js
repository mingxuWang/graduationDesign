/**
 * Created by wmx on 16/5/8.
 */
(function(){
    require.config({
        baseUrl:'widget',
        paths: {
            jquery:'ui/jquery/jquery-2.2.2.min',
            template:'ui/template/template',
            underscore:'ui/underscore/underscore',
            backbone:'ui/backbone/backbone',
        },
        shim: {                     
            'underscore': {
                exports: '_'
            },
            'jquery': {
                exports: '$'
            },
            'template': {
                exports: 'T'
            },
            'backbone': {
                deps: ['underscore', 'jquery'],
                exports: 'Backbone'
            }
        }
    });
    
    require(['backbone', 'underscore', 'ui/back/router/router'], function(){
        Backbone.history.start();   //开始监控url变化
    });
})(window);