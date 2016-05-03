define(['backbone','template','my-buy/tpl'], function (Backbone,T,tpl) {
    var Model = Backbone.Model.extend({
        defaults: function(){
            return {
                list:null,
            }
        },
        getList: function(){
            var that = this;
            $.ajax({
                url:'/schoolBuy/api/my-buy.php',
                type:'POST',
                success:function(data){
                    data = JSON.parse(data);
                    if(data.ret==0){
                        console.log(data.ret);
                        console.log(data.my_buy.length);
                        that.set({list: data.my_buy});
                    }else {
                        //未登录
                        alert('请先登录');
                        location.href = "../index/index.html";
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
        events:{

        },
        initialize: function(){
            this.model = new Model();
            this.render();
            this.listenTo(this.model,'change:list', this.renderList);
            this.model.getList();
        },
        render: function(){
            this.$el.html(tpl.main);
            $(document.body).append(this.$el);
        },
        $list: null,

        renderList: function () {
            var list = this.model.get('list');
            $list = T.compile(tpl.list)({baoliao:list});
            console.log($list);
            this.$el.append($list).addClass('mod-my-buy');
            $(document.body).append(this.$el);
        },

    });
    return View;
});