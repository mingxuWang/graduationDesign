(function () {
    var completed = function () {
        setTimeout(function () {
            var RADIX = 10.8;
            var html = document.documentElement;
            var windowWidth = html.clientWidth;
            html.style.fontSize = windowWidth / RADIX + 'px';
            html.classList.add('site-sales');
        }, 16);
        setTimeout(function(){
            if($('#map').data('exist')){
                var sumHei = window.screen.availHeight;
                var headerHei = $('header').height();
                var height = sumHei-headerHei;
                $('#map').height(height);
            }
        },70);
        
    };
    completed();
    window.onresize = completed;
    window.conf = {};
    conf.is_login = localStorage.getItem('is_login') || false;
    conf.user_data = null;
})();