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
    
    var Model = Backbone.Model.extend({
        defaults:{
            list:null
        },
        getList: function(){
            var that = this;
            $.ajax({
                url: '/artical',
                type: 'GET',
                dataType: 'JSON'
            })
            .done(function(res) {
                if(res.ret ===1){
                    that.set('list',res.list);
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
    className: 'back-artical',
    events: {
        'click .sign-out': 'actSignout',
        'click .crumb': 'actCrumb',
        'click .btn-add': 'actAddParagraph',
        'click .btn-publish': 'actPublishArtical'
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
        this.$el.find('.main .container .content').html(T.compile(tpls.list)({list:that.model.get('list')}));
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
    },
    actPublishArtical: function(){
        var that = this;
        var artical = that.getArtical();
        $.ajax({
            url: '/publish',
            type: 'POST',
            dataType: 'JSON',
            data: artical,
        })
        .done(function(res) {
            if(res.ret ===1){
                alert(res.msg);
                var href = location.href;
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
    getArtical: function(){
        var artical = [];
        var len = $('.artical-item').length;
        for(var i = 0 ; i < len;i++){
            artical.push($($('.artical-item')[i]).val());
        }
        var art = {
            title: $('#title').val(),
            author: $('#author').val(),
            date: $('#date').val(),
            img_src: $('#img-src').val(),
            summary: $('#summary').val(),
            artical:artical
        }
        return art;
    }
});
return index_view;


});
