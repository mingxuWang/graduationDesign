define(['backbone','ui/nav/tpl','ui/router/router'],function(Backbone,tpl,app){
    var view = Backbone.View.extend({
        tagName: 'footer',
        events: {
          'click .nav-item': 'actionSwitch',
        },
        initialize: function (option) {
            // console.log(option);
            this.render();
        },
        render: function () {
            this.$el.html(tpl);
            $(document.body).append(this.$el);
        },
        show: function (nav) {
            this.$el.show()
                .find('.nav-item').removeClass('active').filter('.nav-'+nav).addClass('active');
        },
        hide: function () {
            this.$el.hide();
        },
        actionSwitch: function (e) {
            //var that = this;
            var nav = $(e.currentTarget).data('nav');
            this.$el.find('.nav-item').removeClass('active').filter('.nav-'+nav).addClass('active');
            // console.log(nav);
            if(nav){
                Backbone.history.navigate(nav, {trigger: true, replace: true});
            }
        },
    });
    var mainNav = new view();
    return mainNav;
});

