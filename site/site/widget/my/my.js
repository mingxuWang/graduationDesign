define(['backbone', 'template', 'my/tpls'], function(Backbone, T, tpls) {
    var $canvas = $(document.body).find('#canvas');
    var Model = Backbone.Model.extend({
        //url:'',
        defaults: function() {
            return {
                header: null,
                banner: null,
                list: null
            }
        },
        getList: function() {
            var that = this;

        }
    });
    var View = Backbone.View.extend({
        tagName: 'div',
        model: null,
        className: 'my',
        events: {
            'click .main-cell': 'actBaoliaoDetail',
            'click .list-item': 'actInfo'
        },
        initialize: function() {
            this.model = new Model();
            this.renderSkeleton();
            this.renderHeader();
            this.model.getList();
        },
        renderSkeleton: function() {
            this.$el.html(T.compile(tpls.skeleton));
            $canvas.append(this.$el);

        },
        renderHeader: function() {
            this.$el.find('.main .header').html(T.compile(tpls.header)({ title: '我的' }));
        },
        actInfo: function(e) {
            var id = $(e.currentTarget).data("id");
            Backbone.history.navigate('index/info?id='+id,{trigger: true, replace: false});

        }
    });
    return View;

});
