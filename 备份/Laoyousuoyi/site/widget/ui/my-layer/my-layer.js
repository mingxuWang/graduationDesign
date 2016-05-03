var layerShow = function () {
    var tpls = [
        '<div class="my-layer">',
            '<div class="mask">',
            '</div>',
            '<div class ="layer-main">',
                '<div class="layer-top">',
                    '<div class="personal">',
                        '{{if data}}',
                        '<div class="pic">',
                            '<img src="imgs/01.png">',
                        '</div>',
                        '<p>{{data.user_name}}</p>',
                        '{{/if}}',
                    '</div>',
                '</div>',
                '<div class="layer-body">',
                    '<ul>',
                        '<li class="act-comment">',
                            '<div class="logo">',
                                '<img src="/schoolBuy/static/imgs/comment.png">',
                            '</div>',
                            '<p>评论</p>',
                        '</li>',
                        '<li class="act-collect">',
                            '<div class="logo">',
                                '<img src="/schoolBuy/static/imgs/star.png">',
                            '</div>',
                            '<p>收藏</p>',
                        '</li>',
                        '<li class="act-comeout">',
                            '<div class="logo">',
                                '<img src="/schoolBuy/static/imgs/star.png">',
                            '</div>',
                            '<p>爆料</p>',
                        '</li>',
                    '</ul>',
                '</div>',
                '<div class="layer-footer">',
                    '<div class="logout">',
                        '<button class="btn act-logout" id="act-logout">退出登录</button>',
                    '</div>',
                '</div>',
            '</div>',
        '</div>',
    ].join('');
    $(document).on('click',".my-layer .mask",function(e){
        $('.my-layer').hide();
    });


    $(document).on('click','.act-comment',function () {
        location.href= "../comment/comment.html";
    });
    $(document).on('click','.act-collect',function () {
        location.href= "../collection/collection.html";
    });
    $(document).on('click','.act-comeout',function () {
        location.href= "../comeout/comeout.html";
    });
    $(document).on('click','#act-login',function (){
        location.href = "../login/login.html";
    });
    $(document).on('click','#act-logout',function () {
        $.ajax({
            url:'/schoolBuy/api/logout.php',
            type:'POST',
            success:function(data){
                data = JSON.parse(data);
                console.log(data);
                if(data.ret==0){
                    location.href = "../login/login.html";
                }
            },
            error:function(msg){
                alert('Error:'+msg);
            }
        });
    });
    return tpls;
};
/**
 * Created by mdn on 16/4/10.
 */
