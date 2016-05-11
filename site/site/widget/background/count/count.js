define(['backbone', 'template', 'background/count/tpls','ui/helper/helper','ui/map/map'], function(Backbone, T, tpls,helper,map) {
    var $canvas = $(document.body).find('#canvas');
    var nav_list = [
        {
            role: 'index',
            name:'首页'
        },
        {
            role: 'count',
            name:'用户统计'
        },
        {
            role: 'artical',
            name:'文章发布'
        },
        {
            role: 'activity',
            name:'活动发布'
        }
    ];

    var crumb_list = [
        {
            role: 'info',
            name:'用户信息'
        },{
            role:'record',
            name:'查询统计分析'
        }
    ];

    var Model = Backbone.Model.extend({
        defaults:{
            info : null
        },
        getInfo : function(options){
            var defaults = {
                limit:10,
                skip:0
            };
            var opt = (options?options:defaults);
            var that = this;
            $.ajax({
                url: '/userInfo',
                type: 'POST',
                dataType: 'JSON',
                data:opt
            })
            .done(function(res) {
                if(res.ret ===1){
                    that.set({info : res.info,info_page:res.page,info_count:res.count});
                }else{
                    alert('超出页码范围！');
                }
            })
            .fail(function() {
                console.log("error");
            })
            .always(function() {
                // console.log("complete");
            });
            
        },
        getRecord : function(options){
            var defaults = {
                limit:10,
                skip:0
            };
            var opt = (options?options:defaults);
            var that = this;
            $.ajax({
                url: '/record/search',
                type: 'POST',
                dataType: 'JSON',
                data:opt
            })
            .done(function(res) {
                if(res.ret ===1){
                    that.set({record_count:res.count,record_page:res.page,record : res.record});
                }else{
                    alert('超出页码范围!');
                }
            })
            .fail(function() {
                console.log("error");
            })
            .always(function() {
                console.log("complete");
            });
        }
    });
    
    var index_view = Backbone.View.extend({
    tagName: 'div',
    model: null,
    className: 'back-count',
    events: {
        'click .sign-out': 'actSignout',
        'click .crumb':'actCrumb',
        'click .all':'actShowAll',
        'click .go':'actGoPage',
        'click .btn-checkAll': 'actCheckAll',
        'click .show':'actShowToMap',
        'click .data-btn':'actSearchLimit',
        'click .btn-modify':'actModify',
        'click .btn-delete':'actDelete'
    },
    initialize: function() {
        this.model = new Model();
        this.render();
        this.listenTo(this.model,'change:info',this.renderInfo);
        this.listenTo(this.model,'change:record',this.renderRecord);
        this.model.getInfo();
    },
    render: function() {
        this.renderSkeleton();
        this.renderHeader();
        this.renderNav();
        this.renderCrumb();
    },
    renderSkeleton: function() {
        this.$el.html(T.compile(tpls.skeleton));
        $canvas.append(this.$el);

    },
    renderHeader: function() {
        this.$el.find('.main .header').html(T.compile(tpls.header)({ title: '老有所医', admin: conf.admin_data.name }));
    },
    renderNav: function() {
        this.$el.find('.main .container .nav').html(T.compile(tpls.nav)({ nav: nav_list }));
    },
    renderCrumb: function() {
        this.$el.find('.main .container .breadcrumb').html(T.compile(tpls.breadcrumb)({ crumb: crumb_list }));
        this.$el.find('.crumb').removeClass('active').filter('.crumb-info').addClass('active');

    },
    renderInfo: function() {
        var that = this;
        var list = that.model.get('info');
        var page = that.model.get('info_page');
        var count = that.model.get('info_count');
        this.$el.find('.main .container .content').html(T.compile(tpls.info)({list:list,page:page,count:count}));
    },
    renderRecord:function(){
        var that = this;
        var record = that.model.get('record');
        var page = that.model.get('record_page');
        var count = that.model.get('record_count');
        this.$el.find('.main .container .content').html(T.compile(tpls.record)({record:record,page:page,count:count}));
        map.initBack();
    },
    actSignout: function() {
        conf.admin_is_login = false;
        conf.admin_data = null;
        helper.setItem('admin_is_login',false);
        helper.setItem('admin_data',null);
        Backbone.history.navigate('login',{trigger:true,replace:false});
    },
    actCrumb:function(e){
        var that = this;
        var type = $(e.currentTarget).data('crumb');
        this.$el.find('.crumb').removeClass('active').filter('.crumb-'+type).addClass('active');
        if(type === 'info'){
            that.model.getInfo();
            that.renderInfo();
        }else{
            that.model.getRecord();
            that.renderRecord();
        }
    },
    actShowAll:function(e){
        var that = this;
        var type = $(e.currentTarget).data('type');
        var opt = {
            limit:null
        };
        if(type == 'info'){
            that.model.getInfo(opt);
        }else{
            that.model.getRecord(opt);
        }
    },
    actGoPage:function(e){
        var that = this;
        var type = $(e.currentTarget).data('type');
        var skip = $('#page').val()-1;
        var opt = {
            limit:10,
            skip:skip
        };
        if(type == 'info'){
            that.model.getInfo(opt);
        }else{
            that.model.getRecord(opt);
        }
    },
    actCheckAll:function(){
        $('input[name=check-show]').attr('checked','checked');
    },
    actShowToMap:function(){
        var len = $('input[name=check-show]:checked').length;
        var arr = [];
        for(var i = 0;i<len;i++){
            var list = {
                lng:null,
                lat:null
            }
            list.lng = $($('input[name=check-show]:checked')[i]).data('lng');
            list.lat = $($('input[name=check-show]:checked')[i]).data('lat');
            list.title= $($('input[name=check-show]:checked')[i]).data('title')?$($('input[name=check-show]:checked')[i]).data('title'):'无';
            arr.push(list);
        }
        map.initBack(arr);
    },
    actSearchLimit:function(e){
        var that = this;
        var type = $(e.currentTarget).data('type');
        var date = new Date();
        var opt = {
            time_limit:null,
            limit:null,
            skip:0
        }
        if(type == 1){
            opt.time_limit = (date.getTime()-86400);
        }else if(type == 7){
            opt.time_limit = (date.getTime()-604800);
        }else{
            opt.time_limit = (date.getTime()-2592000);
        }
        that.model.getRecord(opt);
    },
    actModify:function(e){
        var id = $(e.currentTarget).data('id');
        var password = prompt('请输入新密码');
        var opt = {
            id:id,
            password:password
        }
        $.ajax({
            url: '/back/changePassword',
            type: 'POST',
            dataType: 'json',
            data: opt,
        })
        .done(function(res) {
            if(res.ret == 1){
                alert(res.msg);
            }else{
                alert(res.msg);
            }
        })
        .fail(function() {
            console.log("error");
        })
        .always(function() {
            // console.log("complete");
        });
        
    },
    actDelete:function(e){
        var that = this;
        var id = $(e.currentTarget).data('id');
        var ready = confirm('确定要删除该用户吗？');
        if(ready){
            var opt = {
                id:id,
            }
            $.ajax({
                url: '/back/deleteAccount',
                type: 'POST',
                dataType: 'json',
                data: opt,
            })
            .done(function(res) {
                if(res.ret == 1){
                    alert(res.msg);
                    that.model.getInfo();
                }else{
                    alert(res.msg);
                }
            })
            .fail(function() {
                console.log("error");
            })
            .always(function() {
                // console.log("complete");
            });
        }else{
            alert('已撤销删除！');
        }
        
    }
});
return index_view;


});
