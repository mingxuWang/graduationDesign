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
        info:[
            '<table class="info-table table table-bordered table-hover col-md-12">',
                '<thead>',
                    '<td>序号</td><td>用户名</td><td>昵称</td><td>性别</td><td>出生年份</td><td>联系电话</td><td>爱好</td><td>病史</td>',
                '</thead>',
                '{{each list as item index}}',
                    '<tr>',
                        '<td>{{index+1}}</td>',
                        '<td>{{item.username}}</td>',
                        '<td>{{item.name}}</td>',
                        '<td>{{item.gender}}</td>',
                        '<td>{{item.birth_year}}</td>',
                        '<td>{{item.phone}}</td>',
                        '<td>{{item.hobbies.join(" ")}}</td>',
                        '<td>{{item.disease.join(" ")}}</td>',
                    '</tr>',
                '{{/each}}',
            '</table>',
        ].join(''),
        record:[
            '<div class="row">',
                '<div class="btn col-sm-2 btn-default all">显示全部数据</div>',
                '<label class="control-label col-sm-offset-5  col-sm-2 page">共{{page}}页</label>',
                '<div class="input-group col-sm-2 col-sm-offset-10 ">',
                '<input type="text" class="form-control" id="page" placeholder="页码">',
                      '<span class="input-group-btn go">',
                        '<button class="btn btn-default" type="button">Go!</button>',
                      '</span>',
                '</div>',
            '</div>',
            '<table class="info-table table table-bordered table-hover col-md-12">',
                '<thead>',
                    '<td>序号</td><td>时间</td><td>类型</td><td>详情</td><td>程度</td><td>经度</td><td>纬度</td><td>选择</td>',
                '</thead>',
                '{{each record as item index}}',
                    '<tr>',
                        '<td>{{index+1}}</td>',
                        '<td>{{item.locale_time}}</td>',
                        '<td>{{item.condition.types}}</td>',
                        '<td>{{item.condition.detail}}</td>',
                        '<td>{{item.condition.level}}</td>',
                        '<td>{{item.position.lng}}</td>',
                        '<td>{{item.position.lat}}</td>',
                        '<td><input type="checkbox" /></td>',
                    '</tr>',
                '{{/each}}',
            '</table>',
        ].join('')
        
    };
    return tpls;
});
