define(['ui/map/map'],function(map) {
    var geo = {
        checkGeo: function() {
            if (navigator.geolocation) {
                return true
            } else {
                alert('浏览器该更新了~');
                return false
            }
        },
        getPosition: function(){
        	var that = this;
        	navigator.geolocation.getCurrentPosition(that.successFun,that.errorFun);
        },
        successFun: function(position){
        	var coords = position.coords;
        	var lng = coords.longitude;
        	var lat = coords.latitude;
        	var pos = {
        		lng:lng,
        		lat:lat
        	}
        	map.init(pos);
            return pos;
        },
        errorFun: function(error){
        	alert(error.msg);
        }
    }
	return geo
})
