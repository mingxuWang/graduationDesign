define(['backbone','template','my/tpl'],function(Backbone,T,tpl){
    console.log($);
    var Model = Backbone.Model.extend({
        defaults: function(){
            return {
                item: null
            }
        },
        getInfo: function(){
            var that = this;
            $.ajax({
                url:'/api',
                type:'get',
                success:function(data){
                    // data = JSON.parse(data);
                    console.log(data);
                    // if(data.ret==0){
                    //     that.set({item:data});
                    // }
                },
                error:function(msg){
                    alert('Error:'+msg);
                }
            });
        },
        logOut: function () {
            $.ajax({
                url:'/schoolBuy/api/logout.php',
                type:'POST',
                success:function(data){
                    data = JSON.parse(data);
                    console.log(data);
                    if(data.ret==0){
                        location.href = "widget/login/login.html";
                    }
                },
                error:function(msg){
                    alert('Error:'+msg);
                }
            });
        },
        login: function () {

        }
    });
    var View = Backbone.View.extend({
        tagName:'div',
        model: null,
        events: {
            'click .act-comment': 'actComment',
            'click .act-collect': 'actCollection',
            'click .act-comeout': 'actComeout',
            'click .act-login-btn': 'actLogin',
            'click .act-logout': 'actLogOut',
        },
        initialize: function () {
            this.model = new Model();
            this.render();
            this.listenTo(this.model,'change:item',this.renderInfo);
            this.model.getInfo();
        },
        $item: null,
        render: function () {

        },
        renderInfo: function () {
            var item = this.model.get('item');
            $item = T.compile(tpl.main)({item:item});
            this.$el.html($item).addClass('mod-my');

            this.$el.append(tpl.body);
            this.$el.append(T.compile(tpl.logout)({item:item}));
            $(document.body).append(this.$el);
        },
        actComment: function () {
            Backbone.history.navigate('comment',{trigger:true,replace:false});
        },
        actCollection: function () {
            Backbone.history.navigate('collection',{trigger:true,replace:false});
        },
        actComeout: function () {
            Backbone.history.navigate('comeout',{trigger:true,replace:false});
        },
        actLogin: function () {
            location.href = "widget/login/login.html";
        },
        actLogOut: function () {
            this.model.logOut();
        }

    });
    return View;
});
