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
            '{{if list.length == 0}}',
                '<li class="list-item">',
                    '<div class="list-content">',
                        '<div>暂时没有数据</div>',
                    '</div>',
                '</li>',
            '{{/if}}',
            '{{each list as item index}}',
                '<li class="list-item">',
                    '<div class="list-content">',
                        '<div class="btn-again" data-area={{item.condition.area}} data-lng={{item.position.lng}} data-lat={{item.position.lat}} data-search={{item.search}}>再次查询</div>',
                        '<span class="list-date">{{item.locale_time}}</span>',
                        '<div>',
                            '<span class="list-part">类型:<span>{{item.condition.types}}</span></span>',
                            '<span class="list-part">具体情况:<span>{{item.condition.detail}}</span></span>',
                        '</div>',
                        '<div>',
                            '<span class="list-part">范围:<span>{{item.condition.area}}</span></span>',
                            '<span class="list-part">程度状态:<span>{{item.condition.level}}</span></span>',
                        '</div>',
                        '<div class="list-remark">备注：{{item.remark}}</div>',
                    '</div>',
                '</li>',
            '{{/each}}',
            '<div class="empty"></div>'
        ].join('')
    };
    return tpls;
});