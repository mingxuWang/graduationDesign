define(function() {
    var tpls = {
        'skeleton': [
            '<div class="main">',
                '<header class="header row">',
                '</header>',
                '<form class="login-form">',
                '</form>',
            '</div>'
        ].join(''),
        'header': [
            '<h1 class="col-md-12">{{title}}</h1>',
            '<div class="col-md-12">后台管理系统</div>'
        ].join(''),
        form: [
            '<div class="form-group">',
                '<div class="row item">',
                    '<div class="col-md-2 col-md-offset-2">',
                        '<label for="username">用户名：</label>',
                    '</div>',
                    '<div class="col-md-6">',
                        '<input type="text" class="form-control" id="username" placeholder="用户名">',
                    '</div>',
                '</div>',
                '<div class="row item">',
                    '<div class="col-md-2 col-md-offset-2">',
                        '<label for="password">密码：</label>',
                    '</div>',
                    '<div class="col-md-6">',
                        '<input type="password" class="form-control" id="password" placeholder="密码">',
                    '</div>',
                '</div>',
            '</div>',
            '<div class="btn btn-success col-md-2 col-xs-2 col-xs-offset-5 col-md-offset-5">登录</div>'
        ].join('')
    };
    return tpls;
});
