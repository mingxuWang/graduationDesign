define(function() {
    var tpls = {
        'skeleton': [
            '<div class="main">',
                '<header class="header row">',
                '</header>',
                '<div class="container row">',
                    '<ul class="nav nav-pills nav-stacked col-md-2">',
                    '</ul>',
                    '<div class="main-content col-md-10">',
                        '<ol class="breadcrumb col-md-12">',
                        '</ol>',
                        '<div class="content col-md-12">',
                        '</div>',
                    '</div>',
                '</div>',
            '</div>'
        ].join(''),
        'header': [
            '<h1 class="col-md-4">{{title}}</h1>',
            '<div class="col-md-3 col-md-offset-5">hello,<span class="admin-name">{{admin}}</span><span class="sign-out">退出</span></div>'
        ].join(''),
        nav: [
            '{{each nav as item index}}',
                '<li data-nav={{item.role}} class="navs"><a href={{"#"+item.role}}>{{item.name}}</a></li>',
            '{{/each}}'
        ].join(''),
        breadcrumb: [
            '{{each crumb as item index}}',
                '<li data-crumb={{item.role}} class="crumb crumb-{{item.role}}"><a>{{item.name}}</a></li>',
            '{{/each}}'
        ].join(''),
        list: [
            '<table class="info-table table table-bordered table-hover col-md-12">',
                '<thead>',
                    '<td>序号</td><td>题目</td><td>日期</td><td>发布人</td>',
                '</thead>',
                '{{each list as item index}}',
                    '<tr>',
                        '<td>{{index+1}}</td>',
                        '<td>{{item.title}}</td>',
                        '<td>{{item.date}}</td>',
                        '<td>{{item.author}}</td>',
                    '</tr>',
                '{{/each}}',
            '</table>',
        ].join(''),
        publish:[
            '<form class="form-horizontal publish-form">',
                '<div class="btn btn-publish col-sm-2 col-sm-offset-10">发布</div>',
                '<div class="form-group">',
                    '<label for="title" class="col-sm-2 control-label">题目</label>',
                    '<div class="col-sm-10">',
                      '<input type="text" class="form-control" id="title" placeholder="题目">',
                    '</div>',
                '</div>',
                '<div class="form-group">',
                    '<label for="author" class="col-sm-2 control-label">作者</label>',
                    '<div class="col-sm-4">',
                      '<input type="text" class="form-control" disabled id="author" value={{item.user}}>',
                    '</div>',
                    '<label for="date" class="col-sm-2 control-label">时间</label>',
                    '<div class="col-sm-4">',
                      '<input type="text" class="form-control" disabled id="date" value={{item.date}}>',
                    '</div>',
                '</div>',
                '<div class="form-group">',
                    '<label for="img-src" class="col-sm-2 control-label">图片地址链接</label>',
                    '<div class="col-sm-10">',
                      '<input type="text" class="form-control" id="img-src" placeholder="图片需提前上传至七牛存储或选取在线图片">',
                    '</div>',
                '</div>',
                '<div class="form-group">',
                    '<label for="summary" class="col-sm-2 control-label">摘要</label>',
                    '<div class="col-sm-10">',
                      '<textarea name="summary" id="summary" class="form-control" rows="5">',
                      '</textarea>',
                    '</div>',
                '</div>',
                '<div class="form-group art-container">',
                    '<label for="art-content" class="col-sm-2 control-label">正文</label>',
                    '<div class="col-sm-10">',
                      '<textarea name="art-content" id="art-content" class="form-control artical-item" rows="5">',
                      '</textarea>',
                    '</div>',
                '</div>',
                '<div class="col-sm-10 col-sm-offset-2 btn btn-add">增加一段</div>',
            '</form>'
        ].join(''),
        add_para:[
            '<div class="col-sm-10 col-sm-offset-2 add-content">',
              '<textarea name="art-content" class="form-control artical-item" rows="5">',
              '</textarea>',
            '</div>'
        ].join("")
    };
    return tpls;
});