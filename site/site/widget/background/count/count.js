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
            role: 'push',
            name:'消息推送'
        }
    ];

    var crumb_list = [
        {
            role: 'info',
            name:'用户信息'
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
                    that.set({info : res.info})
                }else{
                    alert('Someting wrong!');
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
    className: 'back-count',
    events: {
        'click .sign-out': 'actSignout'
    },
    initialize: function() {
        this.model = new Model();
        this.render();
        this.listenTo(this.model,'change:info',this.renderTable);
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
    renderTable: function() {
        var that = this;
        var list = that.model.get('info');
        this.$el.find('.main .container .content').html(T.compile(tpls.table)({list:list}));
    },
    actSignout: function() {
        conf.admin_is_login = false;
        conf.admin_data = null;
        helper.setItem('admin_is_login',false);
        helper.setItem('admin_data',null);
        Backbone.history.navigate('login',{trigger:true,replace:false});
    }
});
return index_view;


});
