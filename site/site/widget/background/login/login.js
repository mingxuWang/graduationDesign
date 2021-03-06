define(['backbone', 'template', 'background/login/tpls','ui/helper/helper'], function(Backbone, T, tpls,helper) {
    var $canvas = $(document.body).find('#canvas');

    
    var index_view = Backbone.View.extend({
        tagName: 'div',
        model: null,
        className: 'back-login',
        events: {
            'click .btn-success': 'actLogin'
        },
        initialize: function() {
            this.render();
        },
        render: function(){
            this.renderSkeleton();
            this.renderHeader();
            this.renderForm();
        },
        renderSkeleton: function() {
            this.$el.html(T.compile(tpls.skeleton));
            $canvas.append(this.$el);

        },
        renderHeader: function() {
            this.$el.find('.main .header').html(T.compile(tpls.header)({ title: '老有所医' }));
        },
        renderForm: function() {
            this.$el.find('.main .login-form').html(T.compile(tpls.form));
        },
        actLogin: function(e) {
            var user = {
                username: $('#username').val(),
                password: $('#password').val()
            };
            $.ajax({
                url: '/account/admin/login',
                type: 'POST',
                dataType: 'json',
                data: user,
            })
            .done(function(res) {
                if(res.ret ===1){
                    conf.admin_is_login = true;
                    conf.admin_data = res.userInfo;
                    helper.setItem('admin_is_login',true);
                    helper.setItem('admin_data',res.userInfo);
                    Backbone.history.navigate('index',{trigger:true,replace:false});
                }else{
                    alert(res.msg)
                }
            })
            .fail(function() {
            })
            .always(function() {
            });
            

        }
    });
    return index_view;

});
