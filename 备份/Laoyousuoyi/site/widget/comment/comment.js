define(['backbone','template','comment/tpl'], function (Backbone,T,tpl) {

    var Model = Backbone.Model.extend({
        default: function () {
            return {
                post_comment:null,
                receive_comment: null,
            }
        },

        getPostComment: function () {
            var that = this;
            $.ajax({
                url:'/schoolBuy/api/post-comment.php',
                type:'POST',
                success:function(data){
                    data = JSON.parse(data);
                    console.log(data);
                    if(data.ret==0){
                        that.set({post_comment:data.post_comment});
                        //var comment = template("post-comment-tpl",{comment:data.post_comment});
                        //console.log(baoliao);
                        //$(".post-comment-list").html(comment);
                    }else{
                        //  alert('请先登录');
                    }
                },
                error:function(msg){
                    alert('Error:'+msg);
                }
            });
        },
        getReceiveComment: function () {
            var that = this;
            $.ajax({
                url:'/schoolBuy/api/receive-comment.php',
                type:'POST',
                success:function(data){
                    data = JSON.parse(data);
                    console.log(data);
                    if(data.ret==0){
                        that.set({receive_comment:data.receive_comment});
                        //var comment = template("post-comment-tpl",{comment:data.post_comment});
                        //console.log(baoliao);
                        //$(".post-comment-list").html(comment);
                    }else{
                        //  alert('请先登录');
                    }
                },
                error:function(msg){
                    alert('Error:'+msg);
                }
            });
        },
    });
    var View = Backbone.View.extend({
        tagName:'div',
        model: null,
        events: {
            'click .act-back':'actBack',
            'click .post': 'actPostComment',
            'click .receive': 'actReceiveComment',
            'click .comment-from': 'actBaoliao',
        },
        initialize: function () {
            this.model = new Model();
            this.render();
            this.listenTo(this.model,'change:post_comment',this.renderPostComment);
            this.listenTo(this.model, 'change:receive_comment',this.renderReceiveComment);
            this.model.getPostComment();
            this.model.getReceiveComment();
        },
        render: function () {
            this.$el.html(tpl.main).addClass('mod-comment');
            this.$el.append(tpl.tab);
            $(document.body).append(this.$el);
        },
        $postComment: null,
        $receiveComment: null,

        renderPostComment: function () {
            var post_comment = this.model.get('post_comment');
            console.log(post_comment.length);
            this.$postComment = $(T.compile(tpl.postComment)({comment:post_comment}));
            this.$el.append(this.$postComment);
            this.$postComment.hide();
            $(document.body).append(this.$el);
        },
        renderReceiveComment: function () {
            var receive_comment = this.model.get('receive_comment');
            this.$receiveComment = $(T.compile(tpl.receiveComment)({comment:receive_comment}));
            this.$el.append(this.$receiveComment);
            //this.$receiveComment.hide();
            $(document.body).append(this.$el);
        },
        actPostComment: function (e) {
            this.$postComment.show();
            this.$receiveComment.hide();
            $(e.currentTarget).siblings().removeClass('active');
            $(e.currentTarget).addClass('active');
        },
        actReceiveComment: function (e) {
            this.$postComment.hide();
            this.$receiveComment.show();
            $(e.currentTarget).siblings().removeClass('active');
            $(e.currentTarget).addClass('active');
        },
        actBack: function () {
            history.go(-1);
        },
        actBaoliao: function (e) {
            var baoliao_id = $(e.currentTarget).data('baoliao-id');
            Backbone.history.navigate('baoliao-detail?baoliao_id='+baoliao_id, {trigger: true, replace: false});
        }

    });
    return View;
});