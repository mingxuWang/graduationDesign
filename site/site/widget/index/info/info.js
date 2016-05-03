define(['backbone', 'template', 'index/info/tpls'], function(Backbone, T, tpls) {
    var $canvas = $(document.body).find('#canvas');

    var index_model = Backbone.Model.extend({
        //url:'',
        defaults: function() {
            return {
                id: null,
                title: null,
                date: null,
                content: null
            }
        },
        getList: function() {
            var that = this;

        }
    });
    var index_view = Backbone.View.extend({
        tagName: 'div',
        model: null,
        className: 'index-list',
        events: {
            'click .main-cell': 'actBaoliaoDetail',
            'click .list-item': 'actInfo'
        },
        initialize: function() {
            this.model = new index_model();
            this.renderSkeleton();
            this.renderHeader();
            this.renderList();
            this.listenTo(this.model, 'change:baoliao_list', this.renderList);
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
            this.$el.find('.main .list').append(T.compile(tpls.list)({ list: testArr }));
        },
        actInfo: function(e) {
            var id = $(e.currentTarget).data("id");

        }
    });
    return index_view;

});
