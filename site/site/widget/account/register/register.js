define(['backbone', 'template', 'account/register/tpls'], function(Backbone, T, tpls) {

    var $canvas = $(document.body).find('#canvas');
    var hobbies_key = [
        {
            id:'chess',
            show:'下棋'
        },
        {
            id:'climb',
            show:'登山'
        },
        {
            id:'dance',
            show:'广场舞'
        },
        {
            id:'read',
            show:'读书'
        }
    ];
    var disease_key = [
        {
            id:'ear',
            show:'耳鼻喉'
        },
        {
            id:'heart',
            show:'心血管'
        },
        {
            id:'sugar',
            show:'糖尿病'
        },
        {
            id:'knee',
            show:'关节炎'
        }
    ];

    var View = Backbone.View.extend({
        tagName: 'div',
        className: 'register',
        events: {
            'click .act-back': 'actBack',
            'click .ok':'actRegister'
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
        	this.$el.find('.main .sign-up').html(T.compile(tpls.register)({hobbies_list:hobbies_key,disease_list:disease_key}));
        },
        actRegister: function() {
            var that = this;

            var userInfo = that.getInfo();
            console.log(userInfo);
            $.ajax({
                url: '/account/register',
                type: 'POST',
                dataType: 'json',
                data: userInfo,
            })
            .done(function(res) {
                if(res.ret ===1){
                    alert(res.msg);
                    Backbone.history.navigate('/my',{trigger:true,replace:false});
                }else{
                    alert(res.msg);
                }
            })
            .fail(function(res) {
                console.log(res);
            })
            .always(function() {
                console.log("complete");
            });
            
        },
        getInfo: function(){
            var that = this;
            var username = $('#username').val();
            var password = $('#password').val();
            var name = $("#name").val();
            var gender = $("input[name=gender]:checked").val();
            var year = $('#year').val();
            var phone = $('#phone').val();
            var hobbies = [];
            var disease = [];
            that.getArr(hobbies,"hobbies");
            that.getArr(disease,"disease");
            return {
                username : username,
                password : password,
                name : name,
                gender : gender,
                birth_year : year,
                phone : phone,
                hobbies : hobbies,
                disease : disease
            }
        },
        getArr: function(type,str){
            var name = "input[name="+str+"]:checked";
            if($(name).length>0){
                var len = $(name).length;
                for(var i = 0;i<len;i++){
                    type.push($($(name)[i]).val());
                }
            }
        },
        actBack: function() {
            history.go(-1);
        }
    });
    return View;
})
