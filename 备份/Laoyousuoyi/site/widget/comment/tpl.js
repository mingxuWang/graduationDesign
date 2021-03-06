define(function(){
    var tpl = {
        'main':[
            '<div class="header">',
                '<a class="act-back">返回</a>',
                '<p>我的评论</p>',
            '</div>',
        ].join(''),
        'tab':[
            '<div class="comment-tab">',
                '<ul>',
                    '<li class="receive active">',
                    '收到的评论',
                    '</li>',
                    '<li class="post">',
                    '发出的评论',
                    '</li>',
                '</ul>',
            '</div>',
        ].join(''),
        'postComment':[
            '<div class="comment-list post-comment-list">',
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
                                '<span class="time">10分钟前</span>',
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
        'receiveComment':[
            '<div class="comment-list receive-comment-list">',
            '{{if comment.length >0}}',
                '<ul>',
                    '{{each comment as item}}',
                    '<li>',
                        '<div class="pic">',
                            '<img src="{{item.user_img}}">',
                        '</div>',
                        '<div class="content">',
                            '<div class="title">',
                                '<p>收到评论</p>',
                                '<span class="time">10分钟前</span>',
                            '</div>',
                            '<div class="comment-content">',
                                '<p>{{item.comment_info}}</p>',
                            '</div>',
                            '<div class="comment-from" data-baoliao-id="{{item.baoliao_id}}">',
                                '<span>原文</span>',
                            '</div>',
                        '</div>',
                    '</li>',
                    '{{/each}}',
                '</ul>',
            '{{/if}}',
            '</div>',
        ].join(''),
    };
    return tpl;
});
