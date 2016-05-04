(function () {
    var completed = function () {
        setTimeout(function () {
            var RADIX = 10.8;
            var html = document.documentElement;
            var windowWidth = html.clientWidth;
            html.style.fontSize = windowWidth / RADIX + 'px';
            html.classList.add('site-sales');
        }, 16);
    };
    completed();
    window.onresize = completed;
    window.conf = {};
    conf.is_login = false;
    conf.user_data = null;
})();