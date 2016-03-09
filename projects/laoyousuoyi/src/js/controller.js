//home
hospital.controller('homeNoticeCtrl',function($scope){
	$scope.news = [
		{
			title:'关于组织首届资源学院多媒体课件大赛的通知'
		},
		{
			title:'2015年研究生国家奖学金获奖名单公示'
		},
		{
			title:'资源学院研究生学业奖学金评审实施细则'
		},
	]
})
hospital.controller('homeNewsCtrl',function($scope){
	$scope.news = [
		{
			title:'我院召开本学期第二次教学工作会议'
		},
		{
			title:'资源学院召开期末考试考风考纪动员会'
		},
		{
			title:'我院矿业工程系召开三维扫描系统培训会'
		},
	]
})
hospital.controller('homeTrendsCtrl',function($scope){
	$scope.news = [
		{
			title:'我院测绘工程系举行测绘专业毕业实习筹备会'
		},
		{
			title:'我院地理信息系统专业召开课程设计动员会'
		},
		{
			title:'我院资环系开展试卷专项检查整改活动'
		},
	]
})
hospital.controller('homePlatformCtrl',function($scope){
	$scope.news = [
		{
			title:'我院测绘工程系举行测绘专业毕业实习筹备会'
		},
		{
			title:'我院地理信息系统专业召开课程设计动员会'
		},
		{
			title:'我院资环系开展试卷专项检查整改活动'
		},
	]
})
hospital.controller('listLeftCtrl',function($scope,$http,$state,$stateParams){
	$http.get('./data/menu/menu'+$stateParams.menu+'.json').success(function(data){
		$scope.menu = data;
	})
})
hospital.controller('listRightCtrl',function($scope,$http,$state,$stateParams){
	$http.get('./data/list/menu'+$stateParams.menu+'list'+$stateParams.list+'.json').success(function(data){
		$scope.listTitle =data.title;
		$scope.lists = data.lists;
	})
})
hospital.controller('detailsRightCtrl',function($scope,$http,$state,$stateParams,$sce){
	$http.get('./data/details/'+$stateParams.id+'.json').success(function(data){
		$scope.title = data.details;
		$scope.html = data.details.artical;
		$scope.artical = $sce.trustAsHtml($scope.html)
	})
})
