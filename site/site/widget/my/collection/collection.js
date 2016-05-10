define(['backbone', 'template', 'my/collection/tpls'], function(Backbone, T, tpls) {
    var $canvas = $(document.body).find('#canvas');


    var index_model = Backbone.Model.extend({
        url: '/userInfo/record',
        defaults: function() {
            return {
                list: null
            }
        },
        getList: function() {
            var that = this;
            $.ajax({
                url: '/userInfo/record',
                type: 'POST',
                dataType: 'json',
                data: {id:conf.user_data._id},
            })
            .done(function(res) {
                if (res.ret ==1) {
                    that.set({ list: res.list });
                } else {
                    alert(res.msg)
                }
            })
            .fail(function() {
                console.log("error");
            })
            .always(function() {
            });

        }
    });
    var index_view = Backbone.View.extend({
        tagName: 'div',
        model: null,
        className: 'collection',
        events: {
            'click .act-back': 'actBack',
            'click .btn-again':'actSearchAgain'
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
            this.$el.find('.main .header').html(T.compile(tpls.header)({ title: '我的收藏' }));
        },
        renderList: function() {
            var that = this;
            var list = that.model.get('list');
            var collections = list.collections.reverse();
            this.$el.find('.main .list').html(T.compile(tpls.list)({ list: collections }));
        },
        actBack: function() {
            history.go(-1);
        },
        actSearchAgain:function(e){
            var search = $(e.currentTarget).data('search');
            var area = $(e.currentTarget).data('area');
            var lng = $(e.currentTarget).data('lng');
            var lat = $(e.currentTarget).data('lat');
            Backbone.history.navigate('/search?search='+search+'&area='+area+'&lng='+lng+'&lat='+lat,{trigger:true,replace:false});
        }
    });
    return index_view;

});
