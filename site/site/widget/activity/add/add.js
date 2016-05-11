define(['backbone', 'template', 'activity/add/tpls'], function(Backbone, T, tpls) {
    var $canvas = $(document.body).find('#canvas');

    var activity_key = [
        {
            role:'book',
            show:'读书分享'
        },
        {
            role:'dance',
            show:'广场舞'
        },
        {
            role:'fishing',
            show:'垂钓'
        },
        {
            role:'climb',
            show:'登山'
        },
        {
            role:'happy',
            show:'娱乐'
        }
    ];
    var index_view = Backbone.View.extend({
    tagName: 'div',
    model: null,
    className: 'add',
    events: {
        'click .act-back': 'actBack',
        'click .btn-publish': 'actPublishActivity'
    },
    initialize: function() {
        this.render();
    },
    render: function() {
        this.renderSkeleton();
        this.renderHeader();
        this.renderForm();
    },
    renderSkeleton: function() {
        this.$el.html(T.compile(tpls.skeleton));
        $canvas.append(this.$el);
    },
    renderHeader: function() {
        this.$el.find('.main .header').html(T.compile(tpls.header)({ title: '发布活动' }));
    },
    renderForm: function() {
        var name = conf.user_data.name;
        this.$el.find('.main .publish-form').html(T.compile(tpls.form)({ name: name, list: activity_key }));
    },
    actBack: function() {
        history.go(-1);
    },
    actPublishActivity: function(){
        var that = this;
        var act = that.getActivity();
        $.ajax({
            url: '/publish/activity',
            type: 'POST',
            dataType: 'JSON',
            data: act,
        })
        .done(function(res) {
            if(res.ret ===1){
                alert(res.msg);
                Backbone.history.navigate('/activity',{trigger:true,replace:false});
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
    getActivity: function() {
        var date = new Date();
        var act = {
            title: $('#title').val(),
            author: $('#author').val(),
            date: $('#date').val(),
            type: $('input[name=activity]:checked').val(),
            summary: $('#summary').val(),
            site: $('#site').val(),
            show: 0,
            locale_time: date.toLocaleString()
        }
        return act;
    }
});
return index_view;

});
