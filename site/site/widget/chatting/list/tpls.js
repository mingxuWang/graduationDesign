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
                '<img class="list-img" src="{{item.src}}" alt="{{item.alt}}" />',
                '<div class="list-content">',
                    '<span class="list-title">{{item.title}}</span>',
                    '<span class="list-date">{{item.date}}</span>',
                '</div>',
                '<div class="list-summary">{{item.area}}</div>',
                '<div class="list-intro">{{item.intro}}</div>',
            '</li>',
            '{{/each}}'
        ].join('')
    };
    return tpls;
});