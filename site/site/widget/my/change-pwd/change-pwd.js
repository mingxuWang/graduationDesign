define(['backbone', 'template', 'my/change-pwd/tpls','ui/helper/helper'], function(Backbone, T, tpls,helper) {
    var $canvas = $(document.body).find('#canvas');

    var index_view = Backbone.View.extend({
        tagName: 'div',
        model: null,
        className: 'change-pwd',
        events: {
            'click .act-back': 'actBack',
            'click .ok': 'actChange'
        },
        initialize: function() {
            this.renderSkeleton();
            this.renderHeader();
            this.renderChange();
        },
        renderSkeleton: function() {
            this.$el.html(T.compile(tpls.skeleton));
            $canvas.append(this.$el);
        },
        renderHeader: function() {
            this.$el.find('.main .header').html(T.compile(tpls.header)({ title: '修改密码' }));
        },
        renderChange:function(){
            this.$el.find('.main .change').html(T.compile(tpls.change));
        },
        actChange: function(){
            var data = {
                old_pwd: $('#old_pwd').val(),
                new_pwd: $('#new_pwd').val(),
                id: conf.user_data._id
            };
            $.ajax({
                url: '/account/changePassword',
                type: 'POST',
                dataType: 'json',
                data: data,
            })
            .done(function(res) {
                if(res.ret ===1){
                    alert(res.msg);
                    conf.user_data = null;
                    conf.is_login = false;
                    helper.setItem('is_login',false);
                    helper.setItem('user_data',null);
                    Backbone.history.navigate('my',{trigger:true,replace:false});


                }else{
                    alert(res.msg);
                }
            })
            .fail(function() {
                console.log("error");
            })
            .always(function() {
                console.log("complete");
            });
            
        },
        actBack: function() {
            history.go(-1);
        }
    });
    return index_view;

});
