define(function(){
    var tpls = {
        'skeleton': [
            '<div class="main">',
                '<header class="header">',
                '</header>',
                '<div class="show-part">',
                '</div>',
                '<div class="input-part">',
                	'<input type="text" />',
                	'<div class="btn">发送</div>',
                '</div>',
            '</div>'
        ].join(''),
        'header': [
            '<span class="act-back">⬅︎</span>',
            '<h1>{{title}}</h1>'
        ].join('')
    };
    return tpls;
});