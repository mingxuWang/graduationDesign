define(['backbone', 'template', 'search/tpls', 'ui/map/map', 'ui/geolocation/geolocation'], function(Backbone, T, tpls, map, geo) {
    var $canvas = $(document.body).find('#canvas');


    var index_model = Backbone.Model.extend({
        url: '',
        defaults: function() {
            return {
                header: null,
                banner: null,
                list: null
            }
        }
    });
    var index_view = Backbone.View.extend({
        tagName: 'div',
        model: null,
        className: 'search',
        events: {
            // 'click .get-position': 'getPosition'
            'click .check-search': 'checkSearch'
        },
        initialize: function() {
            this.model = new index_model();
            this.renderSkeleton();
            this.renderHeader();
            this.initMap();
            if (geo.checkGeo()) {
                geo.getPosition();
            }
        },
        initMap: function() {
            map.init();
            if ($('#map').data('exist')) {
                var sumHei = window.screen.availHeight;
                var headerHei = $('header').height();
                var height = sumHei - headerHei;
                $('#map').height(height);
            }
        },
        renderSkeleton: function() {
            this.$el.html(T.compile(tpls.skeleton));
            $canvas.append(this.$el);

        },
        renderHeader: function() {
            this.$el.find('.main .header').html(T.compile(tpls.header)({ title: '医疗点查询' }));
        },
        getPosition: function() {
            var position = map.getMarkerPosition();
            console.log(position);
        },
        checkSearch: function(){
            map.nearBySearch();
        }
    });
    return index_view;

});
