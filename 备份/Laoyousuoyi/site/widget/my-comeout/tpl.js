define(function () {
    var tpl = {
        'main': [
            '<div class="header">',
            '<a class="act-back">返回</a>',
            '<p>我的爆料</p>',
            '</div>',
        ].join(''),
        'list': [
            '<ul class="main-body">',
            '{{each baoliao as item}}',
                '<li class="main-cell" data-baoliao-id="{{item.baoliao_id}}">',
                    '<div class="pic">',
                    '<img src="{{item.img}}">',
                    '</div>',
                    '<div class="content">',
                        '<div class="title">',
                        '<p>{{item.title}}</p>',
                        '</div>',
                        '<div class="footer">',
                        '<span>{{item.source_name}} </span>',
                        '<span>{{item.score}} </span>',
                        '</div>',
                    '</div>',
                '</li>',
            '{{/each}}',
            '</ul>',
        ].join(''),
    };
    return tpl;
});