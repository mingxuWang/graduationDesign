define(function () {
    var tpl = {
        'main':[
            '<header>',
                '<h1>我买过</h1>',
            '</header>',
        ].join(''),
        'list':[
            '{{if baoliao.length>0}}',
            '<ul class="main-body">',
            '{{each baoliao as item}}',
                '<li class="main-cell" data-baoliao-id = "{{item.baoliao_id}}">',
                    '<div class="pic">',
                        '<img src="{{item.img}}">',
                    '</div>',
                    '<div class="content">',
                        '<div class="title">',
                            '<p>{{item.title}}</p>',
                        '</div>',
                        '<p>{{item.prices}}</p>',
                        '<div class="footer">',
                            '<span class="source">{{item.source_name}}|{{item.add_time}}</span>',
                            '<span>{{item.comment.length}}</span>',
                            '<span>赞&nbsp{{item.score}}</span>',
                        '</div>',
                    '</div>',
                '</li>',
                '{{/each}}',
            '</ul>',
            '{{else}}',
                '<p class="empty">暂无</p>',
            '{{/if}}',
        ].join(''),
    };
    return tpl;
});
