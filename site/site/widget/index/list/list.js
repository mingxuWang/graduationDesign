define(['backbone', 'template', 'index/list/tpls'], function(Backbone, T, tpls) {

    var $canvas = $(document.body).find('#canvas');//视图切换的容器
    /**
     * list中的Model定义
     */
    var Model = Backbone.Model.extend({
        defaults: function() {
            return {
                list:null
            }
        },
        getList: function() {
            var that = this;
            $.ajax({
                url: '/artical',
                type: 'GET',
                dataType: 'json'
            })
            .done(function(res) {
                if(res.ret ===1){
                    that.set('list',res.list);
                }else{
                    alert(res.msg);
                }
            })
            .fail(function() {
                console.log("error");
            })
            .always(function() {
            });
            

        }
    });
    /**
     * list中的View定义
     */
    var View = Backbone.View.extend({
        tagName: 'div',
        model: null,
        className: 'index-list',
        events: {
            'click .list-item': 'actInfo',
            'click .banner':'actShow',
            'click #pageIn':'actShow'
        },
        initialize: function() {
            this.model = new Model();
            this.renderSkeleton();
            this.renderHeader();
            this.listenTo(this.model, 'change:list', this.renderList);
            this.model.getList();
        },
        renderSkeleton: function() {
            this.$el.html(T.compile(tpls.skeleton));
            $canvas.append(this.$el);

        },
        renderHeader: function() {
            this.$el.find('.main .header').html(T.compile(tpls.header)({ title: '老有所医' }));
        },
        renderBanner: function() {

        },
        renderList: function() {
            var that = this;
            var list = that.model.get('list');
            this.$el.find('.main .list').append(T.compile(tpls.list)({ list: list }));
        },
        actInfo: function(e) {
            var id = $(e.currentTarget).data("id");
            Backbone.history.navigate('index/info?id='+id,{trigger: true, replace: false});

        },
        actShow:function(){
            $('#pageIn').toggle();
        }
    });
    return View;

});
