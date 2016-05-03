(function () {
    var _evClick = "click";
    var _evTouchEnd = "click";
    var _html = window.document.documentElement;
    window.conf = window.conf || {};

    // 如果是移动端，设置根字体大小
    var completed = function () {
        setTimeout(function () {
            var RADIX = 10.8;
            var windowWidth = _html.clientWidth;
            _html.style.fontSize = windowWidth / RADIX + 'px';
        }, 16);
    };

    // 检测是否为PC端
    var isPC = (function () {
        var ua = window.navigator.userAgent.toLowerCase();
        var agent = new Array("android", "iphone", "symbianos", "windows phone", "ipad", "ipod");
        var flag = true;
        if ( flag ) {
            for (var i = 0; i < agent.length; i++) {
                if( ua.indexOf(agent[i]) > 0 ) {
                    flag = false;
                    break;
                }
            };
        };
        // 将结果配置到conf中
        conf.isPC = flag;
    })();

    // 设置tap与click切换
    // 默认根字体大小
    var pcReset = function(){
        _evClick = "click";
        _evTouchEnd = "click";
        _html.style.fontSize = "40px";
        _html.classList.add("adaptToPC");
    }

    if ( conf.isPC ) {
        pcReset();
    };

    // 当浏览器窗口变化时进行不同的处理
    var _completed = conf.isPC ? pcReset : completed;
    _completed();
    window.onresize = _completed;

    // 配置全局事件
    conf.evClick = _evClick;
    conf.evTouchEnd = _evTouchEnd;
})();