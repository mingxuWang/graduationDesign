define(['backbone', 'template', 'account/register/tpls'], function(Backbone, T, tpls) {

    var $canvas = $(document.body).find('#canvas');

    var View = Backbone.View.extend({
        tagName: 'div',
        className: 'register',
        events: {
            'click .act-back': 'actBack'
        },
        initialize: function() {
            var that = this;
            that.render();
            that.renderRegister();
        },
        render: function() {
            var that = this;
            this.$el.html(T.compile(tpls.skeleton)({ title: '注册' }));
            $canvas.append(this.$el);
        },
        renderRegister: function() {
        	var that = this;
        	this.$el.find('.main .sign-up').html(T.compile(tpls.register));
        },
        actSignUp: function() {

        },
        actBack: function() {
            history.go(-1);
        }
    });
    return View;
})
