define(['backbone','template','comeout/tpl'],function(Backbone,T,tpl){
    var Model = Backbone.Model.extend({
        submit: function(data){
            var that = this;
            $.ajax({
                url:'/schoolBuy/api/add-post-baoliao.php',
                type:'POST',
                data:data,
                success:function(data){
                    data = JSON.parse(data);
                    console.log(data);
                    if(data.ret==0){

                    }else{
                        //  alert('请先登录');
                    }
                },
                error:function(msg){
                    alert('Error:'+msg);
                }
            });
        }
    });
    var View = Backbone.View.extend({
        tagName: 'div',
        model: null,
        events: {
            'click .act-back':'actBack',
            'click .act-submit': 'actSubmit',
        },
        initialize: function () {
            this.model = new Model();
            this.render();
        },
        render: function () {
            this.$el.html(tpl.main).addClass('mod-comeout');
            this.$el.append(tpl.body);
            $(document.body).append(this.$el);
        },
        actBack: function(){
            history.go(-1);
        },
        actSubmit: function () {
            var com_title = this.$el.find('#commoidity-title').val();
            var com_name = this.$el.find('#commoidity-name').val();
            var com_url = this.$el.find('#commoidity-url').val();
            var com_price = this.$el.find('#commoidity-price').val();
            var com_reason = this.$el.find('#commoidity-reason').val();
            var data = {
                post_title:com_title,
                post_name: com_name,
                post_prices:com_price,
                post_reason: com_reason,
                post_url: com_url,
            }
            this.model.submit(data);
        }
    });
    return View;
});
