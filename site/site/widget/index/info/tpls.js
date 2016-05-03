define(function(){
    var tpls = {
        'skeleton': [
            '<div class="main">',
                '<header class="header">',
                '</header>',
                '<div class="banner">',
                '</div>',
                '<ul class="list">',
                '</ul>',
            '</div>'
        ].join(''),
        'header': [
                '<h1>{{title}}</h1>'
        ].join(''),
        'banner': [
            '<img src="{{img.src}}" alt="{{img.alt}}" data-id="{{img.id}}" />'
        ].join(''),
        'list': [
            '{{each list as item index}}',
            '<li class="list-item" data-id="{{item.id}}">',
                '<img class="list-img" src="{{item.src}}" alt="{{item.alt}}" />',
                '<div class="list-content">',
                    '<span class="list-title">{{item.title}}</span>',
                    '<span class="list-date">{{item.date}}</span>',
                '</div>',
                '<div class="list-summary">{{item.summary}}</div>',
            '</li>',
            '{{/each}}'
        ].join('')
    };
    return tpls;
});