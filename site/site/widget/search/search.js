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
    var symptom_list = [
        {
            value: 'headache',
            show:'头昏',
            level_low:'社区医疗',
            level_middle:'内科诊所',
            level_high:'脑科医院'
        },
        {
            value: 'heat',
            show:'发热',
            level_low:'诊所',
            level_middle:'社区医疗',
            level_high:'医院'
        },
        {
            value: 'appetite',
            show:'食欲不振',
            level_low:'诊所',
            level_middle:'社区医疗',
            level_high:'医院'
        },
        {
            value: 'cough',
            show:'食欲不振',
            level_low:'诊所',
            level_middle:'社区医疗',
            level_high:'医院'
        },
        {
            value: 'powerless',
            show:'四肢无力',
            level_low:'诊所',
            level_middle:'社区医疗',
            level_high:'医院'
        },
        {
            value: 'heart',
            show:'心绞痛',
            level_low:'社区医疗',
            level_middle:'心血管诊所',
            level_high:'心血管医院'
        },
        {
            value: 'knee',
            show:'关节痛',
            level_low:'诊所',
            level_middle:'骨科诊所',
            level_high:'骨科医院'
        },
    ];
    var disease_list = [
        {
            value: 'eye',
            show:'眼疾',
            level_low:'诊所',
            level_middle:'眼科医院',
            level_high:'大医院'
        },
        {
            value: 'ear',
            show:'耳鸣',
            level_low:'耳鼻喉科',
            level_middle:'耳鼻喉医院',
            level_high:'大医院'
        },
        {
            value: 'heart',
            show:'心脏病',
            level_low:'心血管科',
            level_middle:'心血管专科医院',
            level_high:'大医院'
        },
        {
            value: 'skin',
            show:'皮炎',
            level_low:'皮肤科',
            level_middle:'皮肤专科医院',
            level_high:'大医院'
        },
        {
            value: 'teeth',
            show:'口腔',
            level_low:'口腔诊所',
            level_middle:'口腔专科医院',
            level_high:'大医院'
        },
        {
            value: 'bone',
            show:'骨折',
            level_low:'骨科',
            level_middle:'骨科专科医院',
            level_high:'大医院'
        },
        {
            value: 'heat',
            show:'流感',
            level_low:'呼吸科',
            level_middle:'呼吸科医院',
            level_high:'大医院'
        },
        {
            value: 'sugar',
            show:'糖尿病',
            level_low:'内科',
            level_middle:'内科医院',
            level_high:'大医院'
        },
        {
            value: 'liver',
            show:'肝病',
            level_low:'内科',
            level_middle:'肝病专科医院',
            level_high:'大医院'
        },
    ];
    var search_level=[
        {
            value:'low',
            show:'轻微'
        },
        {
            value:'middle',
            show:'中等'
        },
        {
            value:'high',
            show: '严重'
        }
    ];

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
            'click .detail-item': 'actShowlevel',
            'click .level-item': 'actShowArea',
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
            var that = this;
            if(that.checkLogin()){
                $('.main .search-panel').css('display', 'block');
                this.$el.find('.main .search-panel .search-type').html(T.compile(tpls.search_type)({list:search_type}));
            }else{
                alert('登陆后享受更多功能！');
                Backbone.history.navigate('/my',{trigger:true,replace:false});
            }

        },
        renderNavigatePanel: function(){
            var that = this;
            if(that.checkLogin()){
                $('.main .search-panel').css('display', 'block');
                this.$el.find('.main .search-panel .navigate-panel').html(T.compile(tpls.navigate_list));
            }else{
                alert('登陆后享受更多功能！');
                Backbone.history.navigate('/my',{trigger:true,replace:false});
            }

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
            $('.search-level').html('');            
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
            $('.search-level').html(''); 
            // console.log(type);
            if (type == 'drugstore') {
                that.actShowArea();
            }else if(type == 'symptom'){
                that.actShowDetail(symptom_list);
            }else{
                that.actShowDetail(disease_list);
            }
        },
        actShowDetail: function(detail_list){
            this.$el.find('.main .search-panel .search-detail').html(T.compile(tpls.search_detail)({list:detail_list}));
        },
        actShowlevel:function(){
            this.$el.find('.main .search-panel .search-level').html(T.compile(tpls.search_level)({list:search_level}));
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
            // console.log(type);
            if(type == '医院'){
                var level = $('input[name=level]:checked').val();
                if(level == "high"){
                    type = $('input[name=detail]:checked').data('level-high');
                }else if(level == "low"){
                    type = $('input[name=detail]:checked').data('level-low');

                }else{
                    type = $('input[name=detail]:checked').data('level-middle');
                }
                // console.log(type);
            }
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
            $('.collection').css('display','block');
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
        },
        checkLogin:function(){
            if(conf.is_login == true || conf.is_login == "true" ){
                return true;
            }else{
                return false;
            }
        }
    });
    return View;

});