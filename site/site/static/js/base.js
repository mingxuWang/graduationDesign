(function () {
    var completed = function () {
        setTimeout(function () {
            var RADIX = 10.8;
            var html = document.documentElement;
            var windowWidth = html.clientWidth;
            html.style.fontSize = windowWidth / RADIX + 'px';
        }, 16);
        setTimeout(function(){
            if($('#map').data('exist')){
                var sumHei = window.screen.availHeight;
                var headerHei = $('header').height();
                var height = sumHei-headerHei-5;
                $('#map').height(height);
            }
        },70);
        
    };
    completed();
    window.onresize = completed;
    window.conf = {};
    conf.is_login = JSON.parse(localStorage.getItem('is_login')) || false;
    conf.user_data = JSON.parse(localStorage.getItem('user_data')) || {};
    conf.end = {};
    conf.begin = {};
})();