define(['backbone', 'template', 'chatting/room/tpls'], function(Backbone, T, tpls) {
    var $canvas = $(document.body).find('#canvas');


    var index_model = Backbone.Model.extend({
        url: '/index/list',
        defaults: function() {
            return {
                header: null,
                banner: null,
                list: null
            }
        }
    });
    var index_view = Backbone.View.extend({
        tagName: 'div',
        model: null,
        className: 'room',
        events: {
            'click .act-back': 'actBack'
        },
        initialize: function() {
            this.model = new index_model();
            this.renderSkeleton();
            this.renderHeader();
        },
        renderSkeleton: function() {
            this.$el.html(T.compile(tpls.skeleton));
            $canvas.append(this.$el);
        },
        renderHeader: function() {
            this.$el.find('.main .header').html(T.compile(tpls.header)({ title: 'xx会客室' }));
        },
        actBack: function() {
            history.go(-1);
        }
    });
    return index_view;

});
