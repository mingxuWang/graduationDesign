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
            '<span class="act-back">⬅︎</span>',
            '<h1>{{title}}</h1>'
        ].join(''),
        'list': [
            '{{each list as item index}}',
            '<li class="list-item" data-id="{{item.id}}">',
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