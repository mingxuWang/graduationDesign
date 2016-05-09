define(function(){
    var tpls = {
        'skeleton': [
            '<div class="main">',
                '<header class="header">',
                '</header>',
                '<ul class="list">',
                '</ul>',
            '</div>'
        ].join(''),
        'header': [
                '<h1>{{title}}</h1>'
        ].join(''),
        'list': [
            '{{each list as item index}}',
            '<li class="list-item" data-id="{{item.id}}">',
                '<img class="list-img" src="static/imgs/{{item.type}}.jpeg" alt="{{item.alt}}" />',
                '<div class="list-content">',
                    '<span class="list-title">{{item.title}}</span>',
                '</div>',
                '<div class="list-content">',
                    '<span class="list-date">时间:{{item.date}}</span>',
                '</div>',
                '<div class="list-author">发布人:{{item.author}}</div>',
                '<div class="list-area">地点:{{item.site}}</div>',
                '<div class="list-intro">介绍:{{item.summary}}</div>',
            '</li>',
            '{{/each}}',
            '<div class="empty"></div>'
        ].join('')
    };
    return tpls;
});