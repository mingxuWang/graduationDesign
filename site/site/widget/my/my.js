define(['backbone', 'template', 'my/tpls', 'ui/helper/helper'], function(Backbone, T, tpls, helper) {
    var $canvas = $(document.body).find('#canvas');
    var Model = Backbone.Model.extend({
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
    var View = Backbone.View.extend({
        tagName: 'div',
        model: null,
        className: 'my',
        events: {
            'click .main-cell': 'actBaoliaoDetail',
            'click .list-item': 'actInfo',
            'click .sign-out': 'actSignOut',
            'click .tips': 'pageTips',
            'click .change-pwd': 'pageChangePwd'
        },
        initialize: function() {
            this.model = new Model();
            this.renderSkeleton();
            this.renderHeader();
            this.renderTop();
        },
        renderSkeleton: function() {
            this.$el.html(T.compile(tpls.skeleton));
            $canvas.append(this.$el);

        },
        renderHeader: function() {
            this.$el.find('.main .header').html(T.compile(tpls.header)({ title: '我的' }));
        },
        renderTop: function() {
            var item = {
                gender : conf.user_data.gender,
                name : conf.user_data.name
            }
            this.$el.find('.main .personal-info').html(T.compile(tpls.top)({item:item}));
        },
        actSignOut: function() {
            helper.setItem('is_login',false);
            helper.setItem('user_data',null);
            conf.is_login=false;
            Backbone.history.navigate('index', { trigger: true, replace: false });
        },
        pageTips: function(){
            Backbone.history.navigate('my/tips', { trigger: true, replace: false });
        },
        pageChangePwd: function(){
            Backbone.history.navigate('my/changePassword', { trigger: true, replace: false });
        }
    });
    return View;

});
