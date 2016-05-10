define(function() {
    var tpls = {
        'skeleton': [
            '<div class="main">',
                '<header class="header">',
                '</header>',
                '<div id="map" data-exist="true"></div>',
                '<div class="search-btn">',
                '</div>',
                '<div id="panel">',
                '</div>',
                '<div class="search-panel">',
                    '<img class="close" src="../../static/imgs/exit.png" alt="" />',
                    '<div class="search-type"></div>',
                    '<div class="search-detail"></div>',
                    '<div class="search-level"></div>',
                    '<div class="search-area"></div>',
                    '<div class="search-ok"></div>',
                    '<div class="navigate-panel"></div>',
                '</div>',
            '</div>'
        ].join(''),
        'header': [
            '<div class="position">定位</div>',
            '<h1>{{title}}</h1>',
            '<div class="show-hide">列表开关</div>'
        ].join(''),
        search_btn: [
            '<div class="btn query">查询</div>',
            '<div class="btn collection">收藏</div>',
            '<div class="btn navigate">导航</div>'
        ].join(''),
        search_type: [
            '<div class="type-part">',
                '{{each list as item index}}',
                    '<span>',
                        '<label for="{{item.type}}">{{item.show}}</label>',
                        '<input class="type-item" data-type={{item.type}} id={{item.type}} name="type" data-type={{item.type}} value={{item.show}} type="radio" />',
                    '</span>',
                '{{/each}}',
            '</div>'
        ].join(''),
        search_detail:[
            '<div class="detail-part">',
                '<div class="detail-title">详情：</div>',
                '<div class="detail-list">',
                    '{{each list as item index}}',
                        '<span class="detail-item">',
                            '<label for={{item.value}}>{{item.show}}</label><input  name="detail" id={{item.value}} data-level-low={{item.level_low}} data-level-middle={{item.level_middle}} data-level-high={{item.level_high}} value={{item.show}} type="radio" />',
                        '</span>',
                    '{{/each}}',
                '</div>',
            '</div>'
        ].join(''),
        search_level:[
            '<div class="level-part">',
                '<div class="level-title">程度：</div>',
                '<div class="level-list">',
                    '{{each list as item index}}',
                        '<span class="level-item">',
                            '<label for={{item.value}}>{{item.show}}</label><input  name="level" id={{item.value}} value={{item.show}} type="radio" />',
                        '</span>',
                    '{{/each}}',
                '</div>',
            '</div>'
        ].join(''),
        search_area:[
            '<div class="area-part">',
                '<div class="area-title">范围：</div>',
                '<div class="area-list">',
                    '{{each list as item index}}',
                        '<span class="area-item">',
                            '<label for={{item.for}}>{{item.show}}</label><input  name="area" id={{item.id}} value={{item.value}} type="radio" />',
                        '</span>',
                    '{{/each}}',
                '</div>',
            '</div>'
        ].join(''),
        search_ok:[
            '<div class="ok btn">确认</div>'
        ].join(''),
        navigate_list:[
            '<div class="navigate-list">',
                '<div class="navigate-title">出行方式</div>',
                '<div class="navigate-type walk" data-type="walk">步行</div>',
                '<div class="navigate-type bus" data-type="bus">公交</div>',
                '<div class="navigate-type drive" data-type="drive">驾车</div>',
            '</div>'
        ].join('')
    };
    return tpls;
});
