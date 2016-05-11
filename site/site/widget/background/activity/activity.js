define(['backbone', 'template', 'background/activity/tpls','ui/helper/helper'], function(Backbone, T, tpls,helper) {
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
            role: 'list',
            name:'活动列表'
        },
        {
            role: 'publish',
            name:'活动发布'
        }
    ];
    var activity_key = [
        {
            role:'book',
            show:'读书分享'
        },
        {
            role:'dance',
            show:'广场舞'
        },
        {
            role:'fishing',
            show:'垂钓'
        },
        {
            role:'climb',
            show:'登山'
        },
        {
            role:'happy',
            show:'娱乐'
        }
    ];
    var Model = Backbone.Model.extend({
        defaults:{
            list:null
        },
        getList: function(options){
            var that = this;
            var defaults = {
                limit:10,
                skip:0
            };
            var opt = options?options:defaults;
            $.ajax({
                url: '/activity',
                type: 'POST',
                dataType: 'JSON',
                data:opt
            })
            .done(function(res) {
                if(res.ret ===1){
                    that.set({list:res.list,count:res.count,page:res.page});
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
    })
    var index_view = Backbone.View.extend({
    tagName: 'div',
    model: null,
    className: 'back-push',
    events: {
        'click .sign-out': 'actSignout',
        'click .crumb': 'actCrumb',
        'click .btn-publish': 'actPublishActivity',
        'click .check-btn':'actShowDetail',
        'click .btn-back': 'actBack',
        'click .btn-update': 'actUpdate',
        'click .btn-delete': 'actDelete',
        'click .all':'actShowAll',
        'click .go':'actGoPage'
    },
    initialize: function() {
        this.model = new Model();
        this.render();
        this.listenTo(this.model,'change:list',this.renderList);
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
        this.$el.find('.crumb').removeClass('active').filter('.crumb-list').addClass('active');
    },
    renderList: function() {
        var that = this;
        var list = that.model.get('list');
        var page = that.model.get('page');
        var count = that.model.get('count');
        this.$el.find('.main .container .content').html(T.compile(tpls.list)({list:list,page:page,count:count}));
    },
    renderPublish:function(){
        var date = new Date();
        var time = (date.getMonth()+1)+"月"+date.getDate()+"日";
        var item = {
            user:conf.admin_data.name,
            date: time
        }
        this.$el.find('.main .container .content').html(T.compile(tpls.publish)({item:item,list:activity_key}));
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
        if(type === 'list'){
            that.renderList();
        }else{
            that.renderPublish();
        }
    },
    actPublishActivity: function(){
        var that = this;
        var act = that.getActivity();
        $.ajax({
            url: '/publish/activity',
            type: 'POST',
            dataType: 'JSON',
            data: act,
        })
        .done(function(res) {
            if(res.ret ===1){
                alert(res.msg);
                that.initialize();
            }else{
                alert(res.msg);
            }
        })
        .fail(function() {
            console.log("error");
        })
        .always(function() {
            console.log("complete");
        });
        
    },
    actShowDetail:function(e){
        var id = $(e.currentTarget).data("id");
        var that = this;
        $.ajax({
            url: '/activity/info',
            type: 'POST',
            dataType: 'json',
            data: {id:id},
        })
        .done(function(res) {
            if(res.ret ==1){
                var item = res.info
                that.$el.append(T.compile(tpls.detail)({item:item,list:activity_key}));
                console.log(item);
            }
        })
        .fail(function() {
            console.log("error");
        })
        .always(function() {
            // console.log("complete");
        });
        
    },
    actBack:function(){
        $('.detail-panel').remove();
    },
    actUpdate:function(e){
        var that = this;
        var art = that.getActivity();
         art.id = $(e.currentTarget).data('id');
        $.ajax({
            url: '/activity/update',
            type: 'POST',
            dataType: 'json',
            data: art
        })
        .done(function(res) {
            if(res.ret ===1){
                alert(res.msg);
                that.initialize();

            }else{
                alert(res.msg);
                that.initialize();
            }
        });
    },
    actDelete:function(e){
        var that = this;
        var id = $(e.currentTarget).data('id');
        $.ajax({
            url: '/activity/delete',
            type: 'POST',
            dataType: 'json',
            data: {
                id:id
            }
        })
        .done(function(res) {
            if(res.ret ===1){
                alert(res.msg);
                that.initialize();

            }else{
                alert(res.msg);
                that.initialize();
            }
        });
    },
    getActivity: function(){
        var show = 0;
        if($('input[name=show]:checked').length != 0){
            show = 1;
        }
        var date = new Date();
        var act = {
            title: $('#title').val(),
            author: $('#author').val(),
            date: $('#date').val(),
            locale_time:date.toLocaleString(),
            type:$('input[name=activity]:checked').val(),
            summary:$('#summary').val(),
            site:$('#site').val(),
            show : show
        }
        console.log(act);
        return act;
    },
    actShowAll:function(e){
        var that = this;
        var opt = {
            limit:null
        };
        that.model.getList(opt);
    },
    actGoPage:function(){
        var that = this;
        var skip = $('#page').val()-1;
        var opt = {
            limit:10,
            skip:skip
        };
        that.model.getList(opt);
    }
});
return index_view;


});
