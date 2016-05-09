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
                    '<td>序号</td><td>题目</td><td>日期</td><td>发布人</td><td>是否通过审核</td><td>查看详情</td>',
                '</thead>',
                '{{each list as item index}}',
                    '<tr>',
                        '<td>{{index+1}}</td>',
                        '<td>{{item.title}}</td>',
                        '<td>{{item.date}}</td>',
                        '<td>{{item.author}}</td>',
                        '{{if item.show == 1}}',
                        '<td>是</td>',
                        '{{else}}',
                        '<td>否</td>',
                        '{{/if}}',
                        '<td class="check-btn" data-id={{item._id}}>查看</td>',
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
                    '<label for="author" class="col-sm-2 control-label">发布人</label>',
                    '<div class="col-sm-3">',
                      '<input type="text" class="form-control" disabled id="author" value={{item.user}}>',
                    '</div>',
                    '<label for="date" class="col-sm-2 control-label">时间</label>',
                    '<div class="col-sm-2">',
                      '<input type="text" class="form-control" id="date" value={{item.date}}>',
                    '</div>',
                    '<div class="col-sm-2">',
                        '<label for="show" class="control-label">是否通过审核</label>',
                        '<input type="checkbox" name="show"  id="show" value="1">',
                    '</div>',
                '</div>',
                '<div class="form-group">',
                    '<label for="img-src" class="col-sm-2 control-label">活动类型</label>',
                    '<div class="col-sm-10">',
                        '{{each list as item index}}',
                            '<span class="check-list">',
                                '<label for={{item.role}} class="control-label tip-label">{{item.show}}</label>',
                                '<input id={{item.role}} class="activity-item" name="activity" value={{item.show}} type="radio" />',
                            '</span>',
                        '{{/each}}',
                    '</div>',
                '</div>',
                '<div class="form-group">',
                    '<label for="site" class="col-sm-2 control-label">地点</label>',
                    '<div class="col-sm-10">',
                      '<input type="text" class="form-control" id="site" placeholder="地点">',
                    '</div>',
                '</div>',
                '<div class="form-group">',
                    '<label for="summary" class="col-sm-2 control-label">内容</label>',
                    '<div class="col-sm-10">',
                      '<textarea name="summary" id="summary" class="form-control" rows="5">',
                      '</textarea>',
                    '</div>',
                '</div>',
            '</form>'
        ].join(''),
        detail: [
        '<div class="detail-panel">',
            '<form class="form-horizontal publish-form">',
                '<div data-id={{item._id}} class="btn btn-update col-sm-1 col-sm-offset-8">更新</div>',
                '<div data-id={{item._id}} class="btn btn-delete col-sm-1">删除</div>',
                '<div data-id={{item._id}} class="btn btn-back col-sm-1">退出</div>',
                '<div class="form-group">',
                    '<label for="title" class="col-sm-2 control-label">题目</label>',
                    '<div class="col-sm-10">',
                        '<input type="text" class="form-control" value={{item.title}} id="title" placeholder="题目">',
                '   </div>',
                '</div>',
                '<div class="form-group">',
                    '<label for="author" class="col-sm-2 control-label">发布人</label>',
                    '<div class="col-sm-3">',
                      '<input type="text" class="form-control" disabled id="author" value={{item.author}}>',
                    '</div>',
                    '<label for="date" class="col-sm-2 control-label">时间</label>',
                    '<div class="col-sm-2">',
                      '<input type="text" class="form-control" id="date" value={{item.date}}>',
                    '</div>',
                    '<div class="col-sm-2">',
                        '<label for="show" class="control-label">是否通过审核</label>',
                        '<input type="checkbox" name="show" {{if item.show == 1}}checked{{/if}} id="show" value="1">',
                    '</div>',
                '</div>',
                '<div class="form-group">',
                    '<label for="img-src" class="col-sm-2 control-label">活动类型</label>',
                    '<div class="col-sm-10">',
                        '{{each list as items index}}',
                            '<span class="check-list">',
                                '<label for={{items.role}} class="control-label tip-label">{{items.show}}</label>',
                                '<input id={{items.role}} {{if items.show == item.type}}checked{{/if}} class="activity-item" name="activity" value={{items.show}} type="radio" />',
                            '</span>',
                        '{{/each}}',
                    '</div>',
                '</div>',
                '<div class="form-group">',
                    '<label for="site" class="col-sm-2 control-label">地点</label>',
                    '<div class="col-sm-10">',
                      '<input type="text" class="form-control" id="site" value={{item.site}} placeholder="地点">',
                    '</div>',
                '</div>',
                '<div class="form-group">',
                    '<label for="summary" class="col-sm-2 control-label">内容</label>',
                    '<div class="col-sm-10">',
                      '<textarea name="summary" id="summary" class="form-control" rows="5">{{item.summary}}',
                      '</textarea>',
                    '</div>',
                '</div>',
            '</form>',
        '</div>'
        ].join('')
    };
    return tpls;
});