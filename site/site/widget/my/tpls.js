define(function(){
    var tpls = {
        skeleton: [
            '<div class="main">',
                '<header class="header">',
                '</header>',
                '<div class="personal-info">',
                '</div>',
            '</div>'
        ].join(''),
        header: [
                '<h1>{{title}}</h1>',
                '<div class="sign-out">登出</div>'
        ].join(''),
        top: [
            '<div class="top-part">',
                '<img src="../../../static/imgs/{{item.gender}}.png" alt="" />',
                '<span class="name">{{item.name}}</span>',
            '</div>',
            '<ul class="item-list">',
                '<li>推送消息</li>',
                '<li>收藏医疗点</li>',
                '<li>修改个人信息</li>',
            '</ul>'
        ].join('')
    };
    return tpls;
});