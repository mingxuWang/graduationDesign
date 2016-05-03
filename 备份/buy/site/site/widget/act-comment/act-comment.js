define(['backbone','template','act-comment/tpl'], function (Backbone,T,tpl) {

    var Model = Backbone.Model.extend({
        default: function () {
            return {
                comment:null,
            }
        },
        initialize: function (options) {
            this.id = options.id;
            console.log(this.id);
        },
        getComment: function () {
            var that = this;
            console.log(this.id);
            var data = {baoliao_id:that.id};
            console.log(data);
            $.ajax({
                url:'/schoolBuy/api/all-comment.php',
                type:'POST',
                data: data,
                success:function(data){
                    data = JSON.parse(data);
                    console.log(data);
                    if(data.ret==0){
                        that.set({comment:data.comment});

                    }else{
                        //  alert('请先登录');
                    }
                },
                error:function(msg){
                    alert('Error:'+msg);
                }
            });
        },
        toComment: function (data) {
            var that = this;
            console.log(data);
            $.ajax({
                url:'/schoolBuy/api/add-comment.php',
                type:'POST',
                data: data,
                success:function(data){
                    data = JSON.parse(data);
                    console.log(data);
                    if(data.ret==0){
                        location.reload();
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
            'click .act-comment':'actComment',
        },
        initialize: function (options) {
            this.model = new Model(options);
            this.render();
            this.listenTo(this.model,'change:comment',this.renderComment);
            this.model.getComment();
        },
        render: function () {
            this.$el.html(tpl.main).addClass('mod-act-comment');
            $(document.body).append(this.$el);
        },
        renderComment: function () {
            var comment = this.model.get('comment');
            console.log(comment.length);
            this.$el.append($(T.compile(tpl.comment)({comment:comment})));
            this.$el.append(tpl.commentInput);
            $(document.body).append(this.$el);
        },

        actBack: function () {
            history.go(-1);
        },
        actComment: function () {
            var comment_info = "";
            if(!this.$el.find('#comment').val()){
                return;
            }else {
                comment_info = this.$el.find('#comment').val();
            }

            var data = new Date();
            var data_time = data.getHours()+":"+ data.getMinutes()+":"+ data.getSeconds();

            var data = {
                baoliao_id: this.model.id,
                comment_info: comment_info,
                add_time: data_time,
                comment_type: '1',
            };
            this.model.toComment(data);
        },


    });
    return View;
});