define(function(){
    var tpls = {	
        'skeleton': [
            '<div class="main">',
                '<header class="header">',
                '</header>',
                '<div class="content">',
                '</div>',
            '</div>'
        ].join(''),
        'header': [
        		'<span class="act-back">⬅︎</span>',
                '<h1>{{title}}</h1>'
        ].join(''),
        'content': [
        	'<div class="title">{{item.title}}</div>',
        	'<div class="summary">',
        		'<span class="key author">{{item.author}}</span>',
        		'<span class="key date">{{item.date}}</span>',
        	'</div>',
        	'<div class="artical">',
        	'{{each item.artical as item index}}',
        	'<p class="paragraph">{{item}}</p>',
        	'{{/each}}',
        	'</div>'
        	
        ].join('')
    };
    return tpls;
});