angular.module('templateStore.templates',['ngRoute'])
.config(['$routeProvider', function($routeProvider){
	$routeProvider.
	when('/templates',{
		templateUrl:'templates/templates.html',
		controller:'templatesCtrl'
	}).
	when('/templates/:templateId',{
		templateUrl:'templates/template-details.html',
		controller:'templatesDetailCtrl'
	})
}])
.controller('templatesCtrl',['$scope','$http',function($scope,$http){
	$http.get('json/templates.json').success(function(response){
		
		$scope.details = response;
	});
}])
.controller('templatesDetailCtrl',['$scope','$routeParams','$http','$filter',function($scope,$routeParams,$http,$filter){
	var templateId = $routeParams.templateId;
	$http.get('json/templates.json').success(function(response){
		
		$scope.detail = $filter('filter')(response,function(d){
			return d.id == templateId;
		})[0];
		$scope.MainImage = $scope.detail.images[0].name;
	});
		$scope.setImage = function(image){
			$scope.MainImage = image.name;
		}
}]);