define(['backbone', 'template', 'search/tpls', 'ui/map/map', 'ui/geolocation/geolocation'], function(Backbone, T, tpls, map, geo) {
    var opt,pos;

    var $canvas = $(document.body).find('#canvas');
    var search_type=[
        {
            type:"drugstore",
            show:"药房",

        },
        {
            type:"symptom",
            show:"症状",

        },
        {
            type:"disease",
            show:"病种",

        }
    ];
    var search_area = [
        {
            for: 100,
            show:"100M",
            id:"100",
            value:100

        },
        {
            for: 300,
            show:"300M",
            id:"300",
            value:300

        },
        {
            for: "500",
            show:"500M",
            id:"500",
            value:500

        },
        {
            for: "1000",
            show:"1KM",
            id:"1000",
            value:1000

        },
        {
            for: "3000",
            show:"3KM",
            id:"3000",
            value:3000

        },
        {
            for: "5000",
            show:"5KM",
            id:"5000",
            value:5000

        },
        {
            for: "all",
            show:"全市",
            id:"all",
            value:10000

        },
    ];
    var key_type={
        drugstore : '药房',
        symptom: '医院',
        disease: '医院'
    };

    var index_model = Backbone.Model.extend({
        url: '',
        defaults: function() {
            return {
                header: null,
                banner: null,
                list: null
            }
        }
    });
    var View = Backbone.View.extend({
        tagName: 'div',
        model: null,
        className: 'search',
        events: {
            'click .position': 'getPosition',
            'click .query': 'renderSearchPanel',
            'click .navigate':'renderNavigatePanel',
            'click .close': 'actClose',
            'click .type-item': 'actShowSelection',
            'click .drugstore': 'actShowArea',
            'click .ok': 'actSearch',
            'click .show-hide':'actToggle',
            'click .navigate-type': 'actNavigate'
        },
        initialize: function() {
            this.model = new index_model();
            this.render();
            this.initMap();
        },
        initMap: function() {
            map.init();
            if ($('#map').data('exist')) {
                var sumHei = window.screen.availHeight;
                var headerHei = $('header').height();
                var height = sumHei - headerHei-5;
                $('#map').height(height);
            }
        },
        render: function() {
            this.renderSkeleton();
            this.renderHeader();
            this.renderSearchButton();
        },
        renderSkeleton: function() {
            this.$el.html(T.compile(tpls.skeleton));
            $canvas.append(this.$el);

        },
        renderHeader: function() {
            this.$el.find('.main .header').html(T.compile(tpls.header)({
                title: '医疗点查询'
            }));
        },
        renderSearchButton: function() {
            this.$el.find('.main .search-btn').html(T.compile(tpls.search_btn));
        },
        renderSearchPanel: function() {
            $('.main .search-panel').css('display', 'block');
            this.$el.find('.main .search-panel .search-type').html(T.compile(tpls.search_type)({list:search_type}))
        },
        renderNavigatePanel: function(){
            $('.main .search-panel').css('display', 'block');
            this.$el.find('.main .search-panel .navigate-panel').html(T.compile(tpls.navigate_list));

        },
        getPosition: function() {
            if (geo.checkGeo()) {
                pos = geo.getPosition();
                $('.navigate').css('display','none');
                $('#panel').html('');
            } else {
                alert('您的手机不支持定位功能！请手动拖动~');
            }
        },
        getMarkerPosition:function(){
            pos = map.getMarkerPosition();
            conf.begin.lng = pos.lng;
            conf.begin.lat = pos.lat;
        },
        actClose: function() {
            $('.search-type').html('');
            $('.search-detail').html('');
            $('.search-area').html('');
            $('.search-ok').html('');
            $('.navigate-panel').html('');
            $('.main .search-panel').css('display', 'none');
        },
        actShowSelection: function(e) {
            var that = this;
            var type = $(e.currentTarget).data('type');
            $('.search-detail').html('');
            $('.search-area').html('');
            console.log(type);
            if (type == 'drugstore') {
                that.actShowArea();
            }
        },
        actShowArea: function(){
            this.$el.find('.main .search-panel .search-area').html(T.compile(tpls.search_area)({list:search_area}));
            this.$el.find('.main .search-panel .search-ok').html(T.compile(tpls.search_ok));
        },
        actToggle:function(){
            $('#panel').toggle();
        },
        actSearch: function() {
            var that = this;
            var type = key_type[$('input[name=type]:checked').val()];
            var mile = $('input[name=area]:checked').val();
            that.getMarkerPosition();
            opt = {
                type:type,
                mile:mile,
                lng:pos.lng,
                lat:pos.lat
            };
            that.actClose();
            map.nearBySearch(opt);
        },
        actNavigate: function(e){
            var that = this;
            var type = $(e.currentTarget).data('type');
            that.getMarkerPosition();
            if(type == 'walk'){
                map.walkingSearch();
                that.actClose();
            }else if(type == 'bus'){
                map.busSearch();
                that.actClose();
            }else{
                map.drivingSearch();
                that.actClose();
            }
        }
    });
    return View;

});