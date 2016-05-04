define(['jquery'],function($){
	var mapshow,maker,opt;
	var map = {
		init: function(options){
			var defaults = {
				lng: '114.46',
				lat: '36.6'
			};
			if(options){
				opt = options;
				mapshow = new AMap.Map('map',{
				        zoom: 17,
				        center: [opt.lng,opt.lat]
				    });
				marker = new AMap.Marker({
				        position: [opt.lng,opt.lat],
				        map:mapshow,
				        draggable: true,
				        cursor: 'move',
				        raiseOnDrag: true
				    });
			}else{
				opt = defaults;
				mapshow = new AMap.Map('map',{
				        zoom: 12,
				        center: [opt.lng,opt.lat]
				    });
				marker = new AMap.Marker({
				        position: [opt.lng,opt.lat],
				        map:mapshow,
				        draggable: true,
				        cursor: 'move',
				        raiseOnDrag: true
				    });
			}
			
		},
		getMarkerPosition: function(){
			var position = {
				lng:marker.Ee.position.lng,
				lat:marker.Ee.position.lat
			};
			return position;
		},
		nearBySearch: function(){
			var that = this;
			opt = that.getMarkerPosition();
			AMap.service(["AMap.PlaceSearch"], function() {
			        var placeSearch = new AMap.PlaceSearch({ //构造地点查询类
			            type: '',
			            pageIndex: 1,
			            city: "0310", //城市
			            map: mapshow
			        });
			        
			        var cpoint = [opt.lng, opt.lat]; //中心点坐标
			        placeSearch.searchNearBy('诊所', cpoint, 200, function(status, result) {

			        });
			    });
		}
	};

	return map;
})