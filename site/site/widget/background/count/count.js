define(['backbone', 'template', 'background/count/tpls','ui/helper/helper'], function(Backbone, T, tpls,helper) {
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
            name:'查询统计'
        }
    ];

    var Model = Backbone.Model.extend({
        defaults:{
            info : null
        },
        getList : function(){
            var that = this;
            $.ajax({
                url: '/userInfo',
                type: 'GET',
                dataType: 'JSON'
            })
            .done(function(res) {
                if(res.ret ===1){
                    that.set({info : res.info});
                }else{
                    alert('Someting wrong!');
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
                    that.set({page:res.page});
                    that.set({record : res.record});
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
        'click .go':'actGoPage'
    },
    initialize: function() {
        this.model = new Model();
        this.render();
        this.listenTo(this.model,'change:info',this.renderInfo);
        this.listenTo(this.model,'change:record',this.renderRecord);
        this.model.getList();
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
        this.$el.find('.main .container .content').html(T.compile(tpls.info)({list:list}));
    },
    renderRecord:function(){
        var that = this;
        var record = that.model.get('record');
        var page = that.model.get('page');
        console.log(page);
        this.$el.find('.main .container .content').html(T.compile(tpls.record)({record:record,page:page}));
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
            that.model.getList();
            that.renderInfo();
        }else{
            that.model.getRecord();
            that.renderRecord();
        }
    },
    actShowAll:function(){
        var that = this;
        var opt = {
            limit:null
        };
        that.model.getRecord(opt);
    },
    actGoPage:function(){
        var that = this;
        var skip = $('#page').val()-1;
        var opt = {
            limit:10,
            skip:skip
        };
        that.model.getRecord(opt);
    }
});
return index_view;


});
