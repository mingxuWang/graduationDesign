
$(function () {

    $('.act-back').on('click',function() {
        history.go(-1);
    });
    $('.act-login').on('click',function() {
        location.href = "../login/login.html";
    });
    $(document).on('click','#signup',function(){
        var email = $("#user").val();
        var user_name = $("#user-name").val();
        var student_id = $("#student-id").val();
        var password = $("#password").val();
        var data = {
            email : email,
            user_name : user_name,
            student_id : student_id,
            password : password,
        };
        console.log(data);

        $.ajax({
            url:'/schoolBuy/api/sign-up.php',
            type:'POST',
            data: data,
            success:function(data){
                console.log(data.ret);
                data = JSON.parse(data);
                if(data.ret==0){
                    location.href = "../login/login.html";
                }else{
                    alert("出错了!!");
                    $("input").val("");
                }
            },
            error:function(msg){
                alert('Error:'+msg);
            }
        });
    })
});