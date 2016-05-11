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
            role: 'activity',
            name:'活动发布'
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
        getList: function(options){
            var that = this;
            var defaults = {
                limit:10,
                skip:0
            };
            var opt = options?options:defaults;
            $.ajax({
                url: '/artical',
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
    className: 'back-artical',
    events: {
        'click .sign-out': 'actSignout',
        'click .crumb': 'actCrumb',
        'click .btn-add': 'actAddParagraph',
        'click .btn-publish': 'actPublishArtical',
        'click .check-btn': 'actShowDetail',
        'click .btn-back':'actBack',
        'click .btn-delete':'actDelete',
        'click .btn-update': 'actUpdate',
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
            that.model.getList();
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
            url: '/publish/artical',
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
    actShowDetail:function(e){
        var that = this;
        var id = $(e.currentTarget).data('id');
        $.ajax({
            url: '/artInfo',
            type: 'POST',
            dataType: 'json',
            data: {
                id:id
            }
        })
        .done(function(res) {
            if(res.ret ===1){
                var item = res.info
                that.$el.append(T.compile(tpls.detail)({item:item}));
                console.log(item);

            }else{
                alert(res.msg);
                Backbone.history.navigate('/artical',{trigger:true,replace:false});
            }
        });
    },
    actBack:function(){
        $('.detail-panel').remove();
    },
    actDelete:function(e){
        var that = this;
        var id = $(e.currentTarget).data('id');
        $.ajax({
            url: '/artInfo/delete',
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
    actUpdate:function(e){
        var that = this;
        var art = that.getArtical();
         art.id = $(e.currentTarget).data('id');
        $.ajax({
            url: '/artInfo/update',
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
