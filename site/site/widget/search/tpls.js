define(function(){
    var tpls = {
        'skeleton': [
            '<div class="main">',
                '<header class="header">',
                '</header>',
                '<div class="check-search">测试查询</div>',
                '<div id="map" data-exist="true"></div>',
            '</div>'
        ].join(''),
        'header': [
                '<h1>{{title}}</h1>'
        ].join('')
    };
    return tpls;
});