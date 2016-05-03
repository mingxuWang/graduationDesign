define(['backbone','template','baoliao/baoliao-tpl'], function (Backbone,T,tpls) {
	var index_model = Backbone.Model.extend({
		//url:'',
		defaults: function(){
			return {
				baoliao_list:null,
			}
		},
		getList: function(){
			var that = this;
			$.ajax({
				url:'/schoolBuy/api/list.php',
				type:'POST',
				success:function(data){
					data = JSON.parse(data);
					if(data.ret==0){
						that.set({baoliao_list : data.baoliao});
					}
				},
				error:function(msg){
					alert('Error:'+msg);
				}
			});
		}
	});
	var index_view = Backbone.View.extend({
		tagName: 'div',
		model: null,
		events:{
			'click .main-cell': 'actBaoliaoDetail',
		},
		initialize: function(){
			this.model = new index_model();
			this.render();
			this.listenTo(this.model,'change:baoliao_list', this.renderList);
			this.model.getList();
		},
		render: function(){
			console.log('dd');
			this.$el.html(tpls.main);
			console.log(this.$el);
			console.log($(document.body));
			//console.log($('body'));
			$(document.body).append(this.$el);
			//$(tpls.main).appendTo($('body'));
		},
		$baoliao_list: null,
		renderTop:function () {
			//this.$el.find('#baoliao-list').append($baoliao_list);
		},
		renderList: function () {
			var baoliao_list = this.model.get('baoliao_list');
			$baoliao_list = T.compile(tpls.list)({baoliao:baoliao_list});

			this.$el.find('#baoliao-list').append($baoliao_list);
		},
		actBaoliaoDetail: function (e) {
			var baoliao_id = $(e.currentTarget).data('baoliao-id');
			Backbone.history.navigate('baoliao-detail?baoliao_id='+baoliao_id, {trigger: true, replace: false});

		},
	});
	return index_view;

});
