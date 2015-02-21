'use strict';

angular.module("app", ['ngAnimate']);

angular.module("app").config(['$httpProvider', function($httpProvider){
	$httpProvider.interceptors.push(function(){
  	return {
  		'response': function(response) {
  			if(response.data.success == 2){
  				window.location = '/';
  			}
  			return response;
    	}
  	};
	});
}]);

angular.module("app").controller("ctrl-me", ['$scope', '$http', function($scope, $http){

	angular.extend($scope, {
		tab: 1,
		edit: false,
		messages: [],
		dataCopy: {},
		data: {
			name: $("#user").val(),
			biography: $("#biography").val(),
			location: $("#location").val(),
			website: $("#website").val(),
			created: new Date($("#created").val())
		}
	});

	var data;

	$http.get("/api/message/me").success(function(data){
		if(data.success == 1){
			$scope.messages = data.data;
		}
	});

	$scope.showInfo = function(field){
		if($scope.data[field] == '' || $scope.data[field] == null){
			return false;
		}
		return true;
	};

	$scope.editUser = function(){
		angular.copy($scope.data, $scope.dataCopy);
		$scope.edit = true;
	};

	$scope.cancelUser = function(){
		$scope.data = $scope.dataCopy;
		$scope.edit = false;
	};

	$scope.saveUser = function(tab){
		$http.post("/api/update", $scope.data);
		$scope.edit = false;
	};

	$scope.setTab = function(tab){
		$scope.tab = tab;
	};

}]);