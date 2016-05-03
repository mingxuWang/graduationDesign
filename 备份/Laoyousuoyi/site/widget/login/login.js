$(function(){
    $('.act-back').on('click',function() {
        history.go(-1);
    });
    $('.act-signup').on('click',function() {
        location.href = "../sign-up/sign-up.html";
    });
    var user_name = '';
    var password = '';
    $('#login').on('click',function() {
        console.log('dd');
        if($('#email').val()){
            email = $('#email').val();
        }else{
            alert('请输入用户名');
            return;
        }
        if($('#password').val()){
            password = $('#password').val();
        }else{
            alert('请输入密码');
            return;
        }
        $.ajax({
            url:'/schoolBuy/api/login.php',
            type:'POST',
            data:{
                email: email,
                password: password
            },
            success:function(data){
                console.log(data.ret);
                data = JSON.parse(data);
                if(data.ret==0){
                    location.href = "/schoolBuy/index.html";
                }else{
                    alert(data.error_msg);
                    $("input").val("");
                }
            },
            error:function(msg){
                alert('Error:'+msg);
            }
        });
    });
});