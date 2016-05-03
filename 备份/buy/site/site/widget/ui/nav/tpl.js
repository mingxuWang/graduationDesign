define(function () {
    var tpl = [
            '<ul>',
                '<li class="nav-item nav-baoliao" data-nav = "baoliao">',
                    '<div class="logo">',
                        '<img src="../../../static/imgs/light.png">',
                    '</div>',
                    '<p>超值购</p>',
                '</li>',
                '<li class="nav-item nav-my-buy" data-nav = "my-buy">',
                    '<div class="logo">',
                        '<img src="../../../static/imgs/shopping.png">',
                    '</div>',
                    '<p>我买过</p>',
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

