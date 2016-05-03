/**
 * Created by mdn on 16/4/8.
 */
define(['backbone','template','collection/tpl'], function (Backbone,T,tpl) {
    var Model = Backbone.Model.extend({
        default: function () {
            return {
                list: null,
            }
        },
        getList: function () {
            var that =this;
            $.ajax({
                url:'/schoolBuy/api/my-collection.php',
                type:'POST',
                success:function(data){
                    data = JSON.parse(data);
                    if(data.ret==0){
                        console.log(data.ret);
                        console.log(data.my_collection.length);
                        that.set({list:data.my_collection});

                    }else {
                        //未登录
                        alert('请先登录');
                        Backbone.history.navigate('bailiao',{trigger:true,replace:false});
                    }
                },
                error:function(msg){
                    alert('Error:'+msg);
                }
            });
        }
    });
    var View = Backbone.View.extend({
        tagname:'div',
        model: null,
        events: {
            'click .act-back':'actBack',
        },
        initialize: function () {
            this.model = new Model();
            this.render();
            this.listenTo(this.model,'change:list',this.renderList);
            this.model.getList();
        },
        render: function () {
            this.$el.html(tpl.main).addClass('mod-collection');
            $(document.body).append(this.$el);
        },
        renderList: function () {
            var list = this.model.get('list');
            this.$el.append(T.compile(tpl.list)({baoliao:list}));
            $(document.body).append(this.$el);
        },
        actBack: function () {
            history.go(-1);
        }
    });
    return View;
});

