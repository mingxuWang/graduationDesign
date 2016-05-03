define(['backbone', 'template', 'index/info/tpls'], function(Backbone, T, tpls) {
    var $canvas = $(document.body).find('#canvas');

    var item = {
    	title: "我是测试题目",
    	author: "我是测试作者",
    	date: "5月7日",
    	para: [
    		'我是第一段我是第一段我是第一段我是第一段我是第一段我是第一段我是第一段我是第一段我是第一段我是第一段我是第一段我是第一段我是第一段我是第一段',
    		'我是第二段',
    		'我是第三段',
    		'我是第四段'
    	]
    }
    var Model = Backbone.Model.extend({
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
        className: 'index-info',
        events: {
        	'click .act-back': 'actBack'
        },
        initialize: function(options) {
            this.model = new Model();
            this.renderSkeleton();
            this.renderHeader();
            this.renderPara();
            this.model.getList();
        },
        renderSkeleton: function() {
            this.$el.html(T.compile(tpls.skeleton));
            $canvas.append(this.$el);

        },
        renderHeader: function() {
            this.$el.find('.main .header').html(T.compile(tpls.header)({ title: '推荐文章' }));
        },
        renderPara: function(){
        	this.$el.find('.main .content').html(T.compile(tpls.content)({item:item}));
        },
        actBack: function() {
        	history.go(-1);
        }
    });
    return index_view;

});
