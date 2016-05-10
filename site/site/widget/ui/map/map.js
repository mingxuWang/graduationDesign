define(['jquery'], function($) {
    var mapshow, maker, opt, pos;
    var map = {
        init: function(options) {
            var defaults = {
                lng: '114.492231',
                lat: '36.60124'
            };
            if (options != null) {
                opt = options;
                mapshow = new AMap.Map('map', {
                    zoom: 17,
                    center: [opt.lng, opt.lat]
                });

                var clickEventListener = mapshow.on('click', function(e) {
                    conf.end.lng = e.lnglat.getLng();
                    conf.end.lat = e.lnglat.getLat();
                    alert('成功获取该位置坐标，可以进行导航！');
                    $('.navigate').css('display', 'block');
                });
                marker = new AMap.Marker({
                    position: [opt.lng, opt.lat],
                    map: mapshow,
                    draggable: true,
                    cursor: 'move',
                    raiseOnDrag: true
                });
            }else{
                opt = defaults;
                mapshow = new AMap.Map('map', {
                    zoom: 12
                });
                var clickEventListener = mapshow.on('click', function(e) {
                    // alert(e.lnglat.getLng() + ',' + e.lnglat.getLat());
                    conf.end.lng = e.lnglat.getLng();
                    conf.end.lat = e.lnglat.getLat();
                    alert('成功获取该位置坐标，可以进行导航！');
                    $('.navigate').css('display', 'block');
                });
                marker = new AMap.Marker({
                    position: [opt.lng, opt.lat],
                    map: mapshow,
                    draggable: true,
                    cursor: 'move',
                    raiseOnDrag: true
                });
            }
            conf.begin.lng = opt.lng;
            conf.begin.lat = opt.lat;

        },
        getMarkerPosition: function() {
            var position = {
                lng: marker.Pe.position.lng,
                lat: marker.Pe.position.lat
            };
            return position;
        },
        nearBySearch: function(options) {
            var that = this;
            opt = options;
            AMap.service(["AMap.PlaceSearch"], function() {
                var placeSearch = new AMap.PlaceSearch({ //构造地点查询类
                    type: '',
                    pageIndex: 1,
                    city: "0310", //城市
                    map: mapshow,
                    panel: 'panel'
                });

                var cpoint = [opt.lng, opt.lat]; //中心点坐标
                placeSearch.searchNearBy(opt.type, cpoint, opt.mile, function(status, result) {

                });
            });
        },
        walkingSearch: function() {
            AMap.service('AMap.Walking', function() { //回调函数
                //实例化Walking
                var walking = new AMap.Walking({
                    map: mapshow,
                    panel: "panel"
                });
                //根据起终点坐标规划步行路线
                walking.search([conf.begin.lng, conf.begin.lat], [conf.end.lng, conf.end.lat]);
            })

        },
        drivingSearch: function() {
            AMap.service('AMap.Driving', function() { //回调函数
                //构造路线导航类
                var driving = new AMap.Driving({
                    map: mapshow,
                    panel: "panel"
                });
                // 根据起终点经纬度规划驾车导航路线
                driving.search(new AMap.LngLat(conf.begin.lng, conf.begin.lat), new AMap.LngLat(conf.end.lng, conf.end.lat));
            })

        },
        busSearch: function() {
            AMap.service('AMap.Transfer', function() { //回调函数
                //实例化Transfer
                var transOptions = {
                    map: mapshow,
                    city: '邯郸市',
                    panel: 'panel',
                    policy: AMap.TransferPolicy.LEAST_TIME
                };
                //构造公交换乘类
                var transfer = new AMap.Transfer(transOptions);
                //根据起、终点坐标查询公交换乘路线
                transfer.search(new AMap.LngLat(conf.begin.lng, conf.begin.lat), new AMap.LngLat(conf.end.lng, conf.end.lat));
            });

        }
    };

    return map;
})
