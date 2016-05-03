define(['backbone','template','baoliao-detail/tpl'], function (Backbone,T,tpl) {
    var Model = Backbone.Model.extend({
        default: {
            return: {
                detail: null,
            }
        },
        initialize: function (option){

            this.id = option.id;
        },
        getDetail: function () {
            var that = this
            $.ajax({
                url: '/schoolBuy/api/baoliao-detail.php',
                type: 'POST',
                data: {baoliao_id: this.id},
                success:function(data){
                    data = JSON.parse(data);
                    console.log(data);
                    if(data.ret==0){
                        console.log(data);
                        that.set({detail: data.baoliao});
                    }
                },
                error:function(msg){
                    alert('Error:'+msg);
                }
            });
        }
    });
    var View = Backbone.View.extend({
        tagName: 'div',
        model: null,
        events: {
            'click .act-back': 'actBack',
            'click .act-comment': 'actComment',
        },
        initialize: function(option){
            this.model = new Model(option);
            console.log(this.model.get('detail'));
            this.render();
            this.listenTo(this.model,'change:detail',this.renderInfo);
            this.model.getDetail();
        },
        render: function () {
            this.$el.html(tpl.main);
            //$(document.body).append(this.$el);
        },
        renderInfo: function () {
            var detail = this.model.get('detail');
            console.log(detail.baoliao_id);
            this.$el.append(T.compile(tpl.info)({item:detail})).addClass('mod-baoliao-detail');
            this.$el.append(T.compile(tpl.footer)({item:detail}));
            $(document.body).append(this.$el);
        },
        actBack: function () {
            history.go(-1);
        },
        actComment: function (e) {
            var baoliao_id = $(e.currentTarget).data('baoliao-id');
            Backbone.history.navigate('all-comment?baoliao_id='+baoliao_id,{trigger:true,replace:false});
        }
    });
    return View;
});

