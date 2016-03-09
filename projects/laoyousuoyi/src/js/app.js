var hospital = angular.module('hospital',['ui.router','ngSanitize']);

hospital.run(function($rootScope,$state,$stateParams){
	$rootScope.$state = $state;
	$rootScope.$stateParams = $stateParams;
});


hospital.config(function($stateProvider,$urlRouterProvider){
	$urlRouterProvider.otherwise('/index');
	$stateProvider
	.state('index',{
		url : '/index',
		views : {
			'':{
				templateUrl:'./src/views/home.html'
			},
			'left@index':{
				templateUrl:'./src/views/home-left.html'
			},
			'right@index':{
				templateUrl:'./src/views/home-right.html'
			}
		}
	})
	.state('list',{
		url:'/list?menu&list&id',
		views :{
			'':{
				templateUrl:'./src/views/list.html'
			},
			'left@list' :{
				templateUrl:'./src/views/list-left.html'
			},
			'right@list' :{
				templateUrl:'./src/views/list-right.html'
			}
		}
	})
	.state('details',{
		url:'/details?menu&list&id',
		views:{
			'':{
				templateUrl:'./src/views/details.html'
			},
			'left@details' :{
				templateUrl:'./src/views/details-left.html'
			},
			'right@details' :{
				templateUrl:'./src/views/details-right.html'
			}
		}
	});
});
