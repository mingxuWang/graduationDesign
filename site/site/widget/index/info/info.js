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
        defaults: function() {
            return {
                id: null,
                info:null
            }
        },
        initialize: function(querys){
            var that = this;
            that.set('id',querys.id);
            console.log(querys.id);
        },
        getInfo: function() {
            var that = this;
            $.ajax({
                url: '/artInfo',
                type: 'POST',
                dataType: 'json',
                data: {
                    id:that.get('id')
                }
            })
            .done(function(res) {
                if(res.ret ===1){
                    that.set('info',res.info);
                }else{
                    alert(res.msg);
                    Backbone.history.navigate('/index',{trigger:true,replace:false});
                }
            })
            .fail(function() {
                console.log("error");
            })
            .always(function() {
                console.log("complete");
            });
            

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
            var querys = options.querys;
            this.model = new Model(querys);
            this.renderSkeleton();
            this.renderHeader();
            this.listenTo(this.model,'change:info',this.renderPara);
            this.model.getInfo();
        },
        renderSkeleton: function() {
            this.$el.html(T.compile(tpls.skeleton));
            $canvas.append(this.$el);

        },
        renderHeader: function() {
            this.$el.find('.main .header').html(T.compile(tpls.header)({ title: '推荐文章' }));
        },
        renderPara: function(){
            var that = this;
        	this.$el.find('.main .content').html(T.compile(tpls.content)({item:that.model.get('info')}));
        },
        actBack: function() {
        	history.go(-1);
        }
    });
    return index_view;

});
