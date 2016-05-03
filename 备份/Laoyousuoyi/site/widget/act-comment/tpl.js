define(function(){
    var tpl = {
        'main':[
            '<div class="header">',
            '<a class="act-back">返回</a>',
            '<p>所有评论</p>',
            '</div>',
        ].join(''),

        'comment':[
            '<div class="comment-list">',
                '{{if comment.length >0}}',
                '<ul>',
                    '{{each comment as item}}',
                    '<li>',
                        '<div class="pic">',
                            '<img src="{{item.user_img}}">',
                        '</div>',
                        '<div class="content">',
                            '<div class="title">',
                                '<p>发表评论</p>',
                                '<span class="time">{{item.add_time}}</span>',
                            '</div>',
                            '<div class="comment-content">',
                                '<p>{{item.comment_info}}</p>',
                            '</div>',
                            '<div class="comment-from"  data-baoliao-id="{{item.baoliao_id}}">',
                                '<span data-baoliao-id="{{item.baoliao_id}}">原文</span>',
                            '</div>',
                        '</div>',
                    '</li>',
                    '{{/each}}',
                '</ul>',
                '{{/if}}',
            '</div>',
        ].join(''),
        'commentInput':[
            '<div class="footer">',
                '<input type="text" id="comment" class="input-comment" placeholder="写评论">',
                '<button class="act-comment">发送</button>',
            '</div>',
        ].join(''),
    };
    return tpl;
});

