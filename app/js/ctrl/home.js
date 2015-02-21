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

angular.module("app").controller("ctrl-home", ['$scope', '$http', function($scope, $http){

	angular.extend($scope, {
		message: '',
		messages: [],
		data: {
			user: { }
		}
	});

	$http.get("/api/message").success(function(data){
		if(data.success == 1){
			$scope.messages = data.data;
		}
	});

	$scope.write = function(e){
		if(e.keyCode == 13 || e.type == "click"){
			$http.post("/api/write", { message: $scope.message }).success(function(data){
				if(data.success == 1){
					$("#me-message").html(parseInt($("#me-message").html()) + 1);
					$scope.messages.unshift(data.data);
				}
			});
			$scope.message = "";
			e.preventDefault();
		}
	};

	$scope.disabledWrite = function(message){
		if(message.length > 0){
			return false;
		}
		return true;
	}


}]);