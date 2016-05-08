define(['backbone', 'template', 'background/artical/tpls','ui/helper/helper'], function(Backbone, T, tpls,helper) {
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
            role: 'list',
            name:'文章列表'
        },
        {
            role: 'publish',
            name:'文章发布'
        }
    ];
    
    var index_view = Backbone.View.extend({
    tagName: 'div',
    model: null,
    className: 'back-artical',
    events: {
        'click .sign-out': 'actSignout',
        'click .crumb': 'actCrumb',
        'click .btn-add': 'actAddParagraph',
        'click .btn-publish': 'actPublishArtical'
    },
    initialize: function() {
        this.render();
    },
    render: function() {
        this.renderSkeleton();
        this.renderHeader();
        this.renderNav();
        this.renderCrumb();
        this.renderList();
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
        this.$el.find('.main .container .content').html(T.compile(tpls.list));
    },
    renderPublish:function(){
        var date = new Date();
        var time = (date.getMonth()+1)+"月"+date.getDate()+"日";
        var item = {
            user:conf.admin_data.name,
            date: time
        }
        this.$el.find('.main .container .content').html(T.compile(tpls.publish)({item:item}));
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
    actAddParagraph:function(){
        this.$el.find('.main .container .content .art-container').append(T.compile(tpls.add_para));
    }
    actPublishArtical: function(){
        var title = $('#title').val();
        var author = $('#author').val();
        var date = $('#date').val();
        var img_src = $('#img-src').val();
        var summary = $('#summary').val();
    }
});
return index_view;


});
