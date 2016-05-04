define(function(){
    var tpls = {
        'skeleton': [
            '<div class="main">',
                '<header class="header">',
                '</header>',
                '<div class="change">',
                '</div>',
            '</div>'
        ].join(''),
        'header': [
            '<span class="act-back">⬅︎</span>',
            '<h1>{{title}}</h1>'
        ].join(''),
        change:[
            '<div class="info">',
                '<div class="item">',
                    '<label for="password">原密码：</label>',
                    '<input id="password" name="password" type="text" />',
                '</div>',
                '<div class="item">',
                    '<label for="again">新密码：</label>',
                    '<input id="again" name="again" type="text" />',
                '</div>',
            '</div>',
            '<div class="buttons">',
                '<div class="btn ok">确认提交</div>',
            '</div>'
        ].join('')

    };
    return tpls;
});