define(function () {
    var tpl = [
            '<ul>',
                '<li class="nav-item nav-index" data-nav = "index">',
                    '<div class="logo">',
                        '<img src="../../../static/imgs/index.png">',
                    '</div>',
                    '<p>首页</p>',
                '</li>',
                '<li class="nav-item nav-search" data-nav = "search">',
                    '<div class="logo">',
                        '<img src="../../../static/imgs/search.png">',
                    '</div>',
                    '<p>查询医疗点</p>',
                '</li>',
                '<li class="nav-item nav-my-buy" data-nav = "my-buy">',
                    '<div class="logo">',
                        '<img src="../../../static/imgs/chatting-room.png">',
                    '</div>',
                    '<p>老年会客室</p>',
                '</li>',
                '<li class="nav-item nav-my" data-nav = "my">',
                    '<div class="logo">',
                        '<img src="../../../static/imgs/my.png">',
                    '</div>',
                    '<p>我的</p>',
                '</li>',
            '</ul>',
    ].join('');
    return tpl;
});

