/**
 * Created by mdn on 16/4/17.
 */
define(function () {
    var tpl = {
        'main':[
            '<div class="header">',
                '<div class="title"></div>',
                '<div class="body">',
                    '<div class="pic">',
                        '<img src="{{item.user_img}}">',
                    '</div>',
                    '<div class="content">',
                    '{{if item.user_name}}',
                        '<p class="name">Hi {{item.user_name}}</p>',
                    '{{else}}',
                        '<p class="name">Hi 你好</p>',
                        '<button class="btn act-login-btn" id="act-login">登录</button>',
                    '{{/if}}',
                    '</div>',
                '</div>',
            '</div>',
        ].join(''),
        'body':[
            '<div class="my-options">',
                '<ul>',
                    '<li class="act-comment">',
                        '<div class="logo">',
                            '<img src="/schoolBuy/static/imgs/comment.png">',
                        '</div>',
                        '<p>评论</p>',
                    '</li>',
                    '<li class="act-collect">',
                        '<div class="logo">',
                            '<img src="/schoolBuy/static/imgs/star.png">',
                        '</div>',
                        '<p>收藏</p>',
                    '</li>',
                    '<li class="act-comeout">',
                        '<div class="logo">',
                            '<img src="/schoolBuy/static/imgs/star.png">',
                        '</div>',
                        '<p>爆料</p>',
                    '</li>',
                '</ul>',
            '</div>',
        ].join(''),
        'logout': [
            '<div class="logout">',
            '{{if item.user_name}}',
                '<button class="btn act-logout" id="act-logout">退出登录</button>',
            '{{/if}}',
            '</div>',
        ].join(''),
    };
    return tpl;
});