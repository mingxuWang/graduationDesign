define(['backbone', 'template', 'index/list/tpls'], function(Backbone, T, tpls) {
    var $canvas = $(document.body).find('#canvas');

    var testArr = [{
        id: '123',
        title: '我是一个测试数据',
        date: '5月3日',
        summary: '我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话',
        src: 'http://www.uimaker.com/uploads/160421/1-1604211334301a.jpg'
    }, {
        id: '123',
        title: '我是一个测试数据',
        date: '5月3日',
        summary: '我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话',
        src: 'http://www.uimaker.com/uploads/160421/1-1604211334301a.jpg'
    }, {
        id: '123',
        title: '我是一个测试数据',
        date: '5月3日',
        summary: '我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话',
        src: 'http://www.uimaker.com/uploads/160421/1-1604211334301a.jpg'
    }, {
        id: '123',
        title: '我是一个测试数据',
        date: '5月3日',
        summary: '我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话',
        src: 'http://www.uimaker.com/uploads/160421/1-1604211334301a.jpg'
    }, {
        id: '123',
        title: '我是一个测试数据',
        date: '5月3日',
        summary: '我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话',
        src: 'http://www.uimaker.com/uploads/160421/1-1604211334301a.jpg'
    }, {
        id: '123',
        title: '我是一个测试数据',
        date: '5月3日',
        summary: '我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话',
        src: 'http://www.uimaker.com/uploads/160421/1-1604211334301a.jpg'
    }, {
        id: '123',
        title: '我是一个测试数据',
        date: '5月3日',
        summary: '我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话我只是一段用来测试的话',
        src: 'http://www.uimaker.com/uploads/160421/1-1604211334301a.jpg'
    }]
    var index_model = Backbone.Model.extend({
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
