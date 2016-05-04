define(['backbone', 'template', 'index/list/tpls'], function(Backbone, T, tpls) {
    var $canvas = $(document.body).find('#canvas');

    
    var index_model = Backbone.Model.extend({
        url:'/index/list',
        defaults: function() {
            return {
                header: null,
                banner: null,
                list: null
            }
        },
        getList: function() {
            var that = this;
            that.fetch({
                dataType: "json",
                // data: keys,
                timeout: 20000,
                cache: false,
                success: function (_, response) {
                    if (response) {
                        //TODO 单线请求,可以这样;但是多线请求,可能就会出问题了
                        that.set({list: response});
                    } else {
                        Alert.show(response.msg);
                    }
                },
                error: function (_, errorMsg) {
                    if (errorMsg === "timeout") {
                        Alert.show("网络请求超时!");
                    } else {
                        Alert.show("您的网络似乎有问题, 请检查网络后重试!");
                    }
                }
            });

        }
    });
    var index_view = Backbone.View.extend({
        tagName: 'div',
        model: null,
        className: 'index-list',
        events: {
            'click .list-item': 'actInfo'
        },
        initialize: function() {
            this.model = new index_model();
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

        }
    });
    return index_view;

});
